<?php

$root = dirname(__DIR__);

$_ENV['APP_ENV'] = 'production';
$_ENV['APP_DEBUG'] = 'false';
$_ENV['APP_KEY'] = $_ENV['APP_KEY'] ?? 'base64:' . base64_encode(random_bytes(32));
$_ENV['SESSION_DRIVER'] = 'array';
$_ENV['CACHE_STORE'] = 'array';
$_ENV['DB_CONNECTION'] = 'sqlite';
$_ENV['QUEUE_CONNECTION'] = 'sync';
$_ENV['NETLIFY_BUILD'] = 'true';

foreach ($_ENV as $key => $value) {
    putenv("$key=$value");
}

require $root . '/vendor/autoload.php';

$app = require $root . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$controller = $app->make(App\Http\Controllers\PortfolioController::class);
$html = $controller->index()->render();

$dist = $root . '/dist';
if (is_dir($dist)) {
    $it = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($dist, FilesystemIterator::SKIP_DOTS),
        RecursiveIteratorIterator::CHILD_FIRST
    );
    foreach ($it as $file) {
        $file->isDir() ? rmdir($file->getPathname()) : unlink($file->getPathname());
    }
    rmdir($dist);
}
if (!mkdir($dist, 0777, true) && !is_dir($dist)) {
    throw new RuntimeException('Unable to create dist directory');
}

file_put_contents($dist . '/index.html', $html);

$assets = [
    'css/portfolio.css',
    'css/terminal.css',
    'js/theme-toggle.js',
    'js/scroll-reveal.js',
    'js/particles.js',
    'js/github-projects.js',
    'js/terminal.js',
    'cv.pdf',
    'favicon.svg',
    'robots.txt',
    'thanks.html',
];

foreach ($assets as $asset) {
    $source = $root . '/public/' . $asset;
    if (!is_file($source)) {
        fwrite(STDERR, "Warning: missing asset $asset\n");
        continue;
    }
    $target = $dist . '/' . $asset;
    if (!is_dir(dirname($target))) {
        mkdir(dirname($target), 0777, true);
    }
    copy($source, $target);
}

echo "Static export written to $dist\n";
