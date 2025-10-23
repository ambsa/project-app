<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|string',
            'password' => 'required|string',
        ]);

        // Cek apakah pengguna ada di database
        $user = Pegawai::where('email', $request->email)->first();

        if (!$user) {
            # code...
            throw ValidationException::withMessages([
                'email' => 'Email atau password salah. Silakan coba lagi.',
            ]);
        }
        // Tentukan guard berdasarkan role pengguna
        $guard = match ($user->role?->nama_role) {
            'admin' => 'admin',
            default => 'web',
        };

        // Coba login dengan credentials menggunakan guard yang sesuai
        if (Auth::guard($guard)->attempt(['email' => $request->email, 'password' => $request->password])) {
            // Redirect berdasarkan role pengguna
            Log::info('Login berhasil dengan guard: ' . $guard);
            Log::info('Role pengguna: ' . Auth::guard($guard)->user()->role?->nama_role);

            $redirectRoute = match ($guard) {
                'admin' => 'Admin.Index',
                'web' => 'User.Index',
                default => 'Login',
            };

            return redirect()->intended(route($redirectRoute));
        }

        throw ValidationException::withMessages([
            'email' => 'Email atau password salah. Silakan coba lagi.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        if(
            $request->hasHeader('X-Inertia')
        ){
            return Inertia::location('/');
        }
    }
}
