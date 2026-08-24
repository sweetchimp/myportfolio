<?php

use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::get('/joshko-labs', [PortfolioController::class, 'joshkoLabs'])->name('joshko-labs');