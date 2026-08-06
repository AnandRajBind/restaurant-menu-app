import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { Utensils, Mail, Lock, LogIn, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('remembered_email');
    if (rememberedEmail) {
      setValue('email', rememberedEmail);
      setValue('rememberMe', true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await login(
      { email: data.email, password: data.password },
      data.rememberMe
    );
    setLoading(false);
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 saas-card border-slate-200 dark:border-slate-800 shadow-xl">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary-600 to-primary-500 text-white flex items-center justify-center mx-auto shadow-md">
            <Utensils className="w-6 h-6" />
          </div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-[11px] font-bold text-primary-600 dark:text-primary-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Portal Sign In</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-slate-100">
            Sign In to GourmetBite
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage restaurant menu catalog, availability, and categories
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Email */}
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            leftIcon={Mail}
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address',
              },
            })}
            error={errors.email?.message}
          />

          {/* Password with Vertically Centered Eye Toggle */}
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            autoComplete="current-password"
            leftIcon={Lock}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
            error={errors.password?.message}
          />

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <Checkbox
              label="Remember Login"
              description="Save email address on this browser"
              {...register('rememberMe')}
            />
          </div>

          {/* Submission Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2 py-2.5 text-sm"
            isLoading={loading}
            leftIcon={LogIn}
          >
            Sign In to Dashboard
          </Button>
        </form>

        {/* Footer Link */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-bold text-primary-600 dark:text-primary-400 hover:underline"
          >
            Register Account
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
