{{--
    Shared status + action block for a featured project.
    Used by BOTH the Portfolio page and the Joshko Labs page so their status
    behaviour is guaranteed identical.

    Expects: $project (array entry from config('projects.featured'))

    Rule: a live demo URL always wins -> "Live" badge + Live Demo button,
    regardless of the status field. Otherwise the status field drives the
    badge, and the demo button becomes a disabled "Coming soon" label.
--}}
@php
    $hasLive = !empty($project['demo_url']);

    $labels = [
        'completed'      => 'Live',
        'in_development' => 'In Development',
        'coming_soon'    => 'Coming Soon',
    ];
    $modifiers = [
        'completed'      => 'live',
        'in_development' => 'dev',
        'coming_soon'    => 'soon',
    ];

    $effective = $hasLive ? 'completed' : ($project['status'] ?? 'coming_soon');
    if (!isset($labels[$effective])) {
        $effective = 'coming_soon';
    }
@endphp
<span class="project-badge project-badge--{{ $modifiers[$effective] }}">{{ $labels[$effective] }}</span>
@if ($hasLive)
    <a class="btn btn-primary project-demo" href="{{ $project['demo_url'] }}" target="_blank" rel="noopener">Live Demo</a>
@else
    <span class="project-demo project-demo--disabled" aria-disabled="true">Coming soon</span>
@endif
