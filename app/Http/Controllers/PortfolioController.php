<?php

namespace App\Http\Controllers;

use App\Models\BusinessInquiry;
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

    public function joshkoLabs()
    {
        return view('joshko-labs');
    }

    public function joshkoLabsContact(Request $request)
    {
        $validated = $request->validate([
            'name'                => 'required|string|max:255',
            'email'               => 'required|email',
            'company'             => 'nullable|string|max:255',
            'project_description' => 'required|string',
        ]);

        // Honeypot — silently reject bot submissions
        if ($request->filled('website')) {
            return back()->with('success', 'Inquiry received — thanks!');
        }

        BusinessInquiry::create($validated);

        return back()->with('success', 'Inquiry received — thanks!');
    }
}