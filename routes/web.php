<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\AdminController;


use App\Http\Controllers\User\UserController;




Route::get('/', function () {
    return Inertia::render('Auth/Login');
})->name('login');
Route::post('/', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::middleware(['auth:admin', 'check.admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('Admin.Index');

    // routes untuk menu task
    Route::get('/admin/task', [AdminController::class, 'task'])->name('admin.task.index');
    Route::post('/admin/task', [AdminController::class, 'store'])->name('admin.task.store');
    Route::get('/admin/task/{id}/show', [AdminController::class, 'show'])->name('admin.task.show');
    Route::patch('/admin/task/{id}', [AdminController::class, 'update'])->name('admin.task.update');
    Route::delete('/admin/task/{id}', [AdminController::class, 'destroy'])->name('admin.task.destroy');


    Route::get('/admin/tasklog', [AdminController::class, 'tasklog'])->name('admin.tasklog.index');
});

Route::middleware(['auth:web', 'check.user'])->group(function () {
    Route::get('/user', [UserController::class, 'index'])->name('user.index');
});

// Route::get("/", [LoginController::class, 'showLoginForm'])->name('login');
// Route::post('/', [LoginController::class, 'login']);
// Route::post('/logout', [LoginController::class, 'logout'])->name('logout');