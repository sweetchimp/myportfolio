<?php

namespace App\Http\Controllers;

class PortfolioController extends Controller
{
    public function index()
    {
        return view('portfolio.index');
    }

    public function joshkoLabs()
    {
        return view('joshko-labs');
    }
}
