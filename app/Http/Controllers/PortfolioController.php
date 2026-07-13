<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index()
    {
        return view('portfolio.index');
    }

    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'message' => 'required|string',
        ]);

        // Honeypot — silently reject bot submissions
        if ($request->filled('website')) {
            return back()->with('success', 'Message received — thanks!');
        }

        Message::create($validated);

        return back()->with('success', 'Message received — thanks!');
    }
}