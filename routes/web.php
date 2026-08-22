<?php

use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::post('/contact', [PortfolioController::class, 'submitContact'])->name('contact.submit');
Route::get('/joshko-labs', [PortfolioController::class, 'joshkoLabs'])->name('joshko-labs');
Route::post('/joshko-labs/contact', [PortfolioController::class, 'joshkoLabsContact'])->name('joshko-labs.contact');