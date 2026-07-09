<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Name — Portfolio</title>
</head>
<body>

    @if (session('success'))
        <p>{{ session('success') }}</p>
    @endif

    <section id="about">
        <h1>Your Name</h1>
        <p>1st Year CS Engineering Student, University of Debrecen</p>
    </section>

    <section id="skills">
        <h2>Skills</h2>
        <ul>
            <li>PHP</li>
            <li>C</li>
            <li>Python</li>
        </ul>
    </section>

    <section id="goals">
        <h2>Goals</h2>
        <ul>
            <li>Finish first-year coursework strong</li>
            <li>Build 3 full-stack projects</li>
        </ul>
    </section>

    <section id="contact">
        <h2>Contact</h2>
        <form action="{{ route('contact.submit') }}" method="POST">
            @csrf
            <input type="text" name="name" placeholder="Name" required>
            <input type="email" name="email" placeholder="Email" required>
            <textarea name="message" placeholder="Message" required></textarea>
            <button type="submit">Send</button>
        </form>
    </section>

</body>
</html>