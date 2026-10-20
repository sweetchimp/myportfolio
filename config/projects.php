<?php

/*
|--------------------------------------------------------------------------
| Featured Projects — single source of truth
|--------------------------------------------------------------------------
|
| This list is looped over by BOTH the Portfolio page
| (resources/views/portfolio/index.blade.php) and the Joshko Labs page
| (resources/views/joshko-labs.blade.php). Edit a project here once and it
| updates on both pages.
|
| Fields per project:
|   name        (string)  Display title.
|   kind        (string)  Small uppercase eyebrow / category label.
|   description (string)  Short summary shown on the card.
|   tags        (array)   Tech tags. Empty array = no tag row rendered.
|   demo_url    (string)  Live demo URL, or '' / null when there is none.
|   github_url  (string)  Repository or profile URL.
|   status      (string)  One of: 'completed' | 'in_development' | 'coming_soon'.
|
| Status rule (applied automatically on both pages):
|   If demo_url is set, the card ALWAYS shows the "Live" badge and the
|   Live Demo button, REGARDLESS of the status field. Only when demo_url
|   is empty does the status field drive the badge, and the demo button is
|   replaced by a disabled "Coming soon" label.
|
*/

return [

    'featured' => [

        [
            'name'        => 'Alton Hotels Management System',
            'kind'        => 'Hotel Operations Platform',
            'description' => 'A full hotel operations platform built for a 30-room property — reservations, guest management, check-in/check-out, F&B, staff management, and reporting.',
            // TODO: no tech tags were present in the original card — add them here when ready.
            'tags'        => [],
            'demo_url'    => 'https://altonhotels.netlify.app/',
            // TODO: replace with the specific Alton Hotels repository URL.
            'github_url'  => 'https://github.com/sweetchimp',
            'status'      => 'completed',
        ],

        [
            'name'        => 'FarmOS',
            'kind'        => 'Farm Management System',
            'description' => 'A farm management system designed for small-to-medium mixed farms — tracking expenses, production, sales, and worker payments. Validated against a real 200-animal, 10-crop farm operation.',
            // TODO: no tech tags were present in the original card — add them here when ready.
            'tags'        => [],
            'demo_url'    => 'https://farmosagrihub.online/',
            // TODO: replace with the specific FarmOS repository URL.
            'github_url'  => 'https://github.com/sweetchimp',
            'status'      => 'completed',
        ],

        [
            'name'        => 'Mr. Mailer',
            // TODO: give Mr. Mailer a proper category label.
            'kind'        => 'Project',
            // TODO: replace with a real description for Mr. Mailer.
            'description' => 'Placeholder description — add a short summary of what Mr. Mailer does.',
            // TODO: replace with the real tech stack for Mr. Mailer.
            'tags'        => [],
            'demo_url'    => 'https://mrmailer.online/',
            // TODO: replace with the specific Mr. Mailer repository URL.
            'github_url'  => 'https://github.com/sweetchimp',
            'status'      => 'completed',
        ],

    ],

];
