import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-8">
          About Pick For Me TV
        </h1>
        <Separator className="mb-12" />

        <div className="space-y-8 text-slate-300 text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Remember Channel Surfing?</h2>
            <p>
              You remember it, right? You&apos;d flip through the channels and suddenly—there it is. Your favorite show. An episode you haven&apos;t seen in years. You settle in, grab the remote, and just... watch. No scrolling, no deliberating, no existential crisis. Pure, unfiltered comfort TV.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">We Brought It Back</h2>
            <p>
              Pick For Me TV recreates that magic for the streaming era. No more infinite scrolling through algorithms designed to confuse you. Instead, tell us your favorite shows, and we&apos;ll randomly pluck an episode from your collection—the only thing you have to do is pull it up. It&apos;s like channel surfing, but every channel is a show you actually love.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
            <p>
              Add your favorite shows to your collection. Hit the button. We find a random episode. You watch it. Repeat until your couch needs a new imprint of your body. No decisions to make. No paralysis by choice. Just pick, watch, enjoy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">The Magic</h2>
            <p>
              Sometimes you&apos;ll get exactly what you wanted. Sometimes you&apos;ll stumble upon an episode you completely forgot about. Sometimes you&apos;ll wonder why you ever added that show in the first place. But that&apos;s the beauty of it—you&apos;re rediscovering your own taste, one random episode at a time.
            </p>
            <p className="mt-4">
              The streaming wars gave us unlimited choices. We gave you unlimited comfort.
            </p>
          </section>

          <section className="pt-8">
            <p className="text-slate-400 italic">
              Now stop reading and go find your next favorite episode. Your couch is waiting.
            </p>
          </section>

          <section className="pt-4 border-t border-slate-700">
            <p className="text-sm text-slate-500">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
              <Link href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
                <Image src="/tmdb_blue_long_2.svg" alt="TMDB logo" className="pl-2 inline" width={112} height={0} />
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
