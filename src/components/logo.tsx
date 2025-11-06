import { HeartPulse } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-foreground transition-colors hover:text-primary',
        className
      )}
    >
      <HeartPulse className="h-6 w-6" />
      <span className="text-lg font-semibold">ChronicleMD</span>
    </Link>
  );
};

export default Logo;
