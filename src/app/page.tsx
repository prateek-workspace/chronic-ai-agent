import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Activity,
  AlertTriangle,
  HeartPulse,
  Bot,
  LineChart,
  Link as LinkIcon,
  BrainCircuit,
  UserCheck,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Logo from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/theme-toggle';

const features = [
  {
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    title: 'Real-Time Monitoring',
    description:
      'Integrate with smartwatches to get continuous updates on vital signs and activity levels.',
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: 'AI-Driven Analysis',
    description:
      'Leverage cutting-edge AI to identify trends and predict potential health risks before they become critical.',
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-primary" />,
    title: 'Critical Alert Feed',
    description:
      'Receive immediate notifications for critical health events, enabling timely interventions.',
  },
  {
    icon: <LineChart className="w-8 h-8 text-primary" />,
    title: 'Health Timelines',
    description:
      'Visualize patient health history with detailed timelines, AI insights, and care interventions.',
  },
];

const howItWorks = [
  {
    icon: <LinkIcon className="w-8 h-8 text-primary" />,
    title: '1. Connect Devices',
    description: 'Patients easily connect their existing smartwatches and other health monitoring devices to our secure platform.',
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: '2. AI Analyzes Data',
    description: 'Our platform continuously analyzes incoming data streams to identify subtle trends, patterns, and potential risks using advanced AI algorithms.',
  },
  {
    icon: <UserCheck className="w-8 h-8 text-primary" />,
    title: '3. Clinicians Get Insights',
    description: 'Healthcare professionals receive actionable insights, predictive alerts, and comprehensive reports through an intuitive dashboard.',
  }
];

const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Dr. Sarah Johnson',
    title: 'Cardiologist',
    quote: "ChronicleMD has revolutionized how we manage our chronic heart failure patients. The AI-powered alerts allow us to intervene earlier, significantly improving patient outcomes.",
    avatarId: 'avatar-testimonial-1'
  },
  {
    id: 'testimonial-2',
    name: 'Dr. Mark Lee',
    title: 'General Practitioner',
    quote: "The platform's ease of use and the depth of insights it provides are remarkable. It has become an indispensable tool in my practice for proactive patient care.",
    avatarId: 'avatar-testimonial-2'
  }
]

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-doctor');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Button variant="ghost" asChild>
            <Link href="#features">Features</Link>
          </Button>
           <Button variant="ghost" asChild>
            <Link href="#how-it-works">How It Works</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">View Dashboard</Link>
          </Button>
          <ThemeToggle />
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Proactive Chronic Care with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    ChronicleMD provides healthcare professionals with real-time
                    insights and predictive analytics to revolutionize chronic
                    patient management.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/dashboard">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={400}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  A Smarter Way to Monitor Health
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform integrates advanced technology to provide a
                  comprehensive overview of patient health, enabling better care
                  decisions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 mt-12">
              {features.slice(0, 2).map((feature) => (
                <Card key={feature.title} className="bg-card/50">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 mt-8">
              {features.slice(2, 4).map((feature) => (
                <Card key={feature.title} className="bg-card/50">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Simple Steps to Proactive Care
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our streamlined process makes it easy to get started with AI-powered patient monitoring.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-3 md:gap-12 mt-12">
              {howItWorks.map((step) => (
                <div key={step.title} className="flex flex-col items-center text-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
             <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Trusted by Healthcare Professionals
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear what doctors are saying about ChronicleMD.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 mt-12">
              {testimonials.map((testimonial) => {
                const avatar = PlaceHolderImages.find(img => img.id === testimonial.avatarId);
                return (
                  <Card key={testimonial.id} className="bg-card/50">
                    <CardContent className="pt-6">
                      <blockquote className="text-lg leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                    </CardContent>
                     <CardHeader className="flex flex-row items-center gap-4">
                      {avatar && (
                        <Avatar>
                          <AvatarImage src={avatar.imageUrl} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

         <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10 text-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground">
              Ready to Transform Patient Care?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl mt-4">
              Join the growing number of clinics embracing the future of chronic disease management.
            </p>
            <div className="mt-6">
              <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/dashboard">
                  Request a Demo
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} ChronicleMD. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
