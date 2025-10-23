<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Cek untuk login sebagai user
        if (!Auth::guard('web')->check()) {
            return redirect()->route('login')->with('error', 'Silakan login sebagai user.');
        }

        // Cek apakah pengguna memiliki role 'user'
        if (Auth::guard('web')->user()->role?->nama_role !== 'user') {
            return redirect()->route('login')->with('error', 'Akses ditolak. Anda bukan user.');
        }

        return $next($request);
    }
}
