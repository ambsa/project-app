<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Cek untuk login sebagai admin
        if (!Auth::guard('admin')->check()) {
            return redirect()->route('login')->with('error', 'Silakan login sebagai admin.');
        }

        // Cek apakah pengguna memiliki role 'admin'
        if (Auth::guard('admin')->user()->role?->nama_role !== 'admin') {
            return redirect()->route('login')->with('error', 'Akses ditolak. Anda bukan admin.');
        }

        return $next($request);
    }
}
