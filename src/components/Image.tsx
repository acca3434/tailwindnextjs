'use client'
import Link from 'next/link'
import { Photo } from '@/photos'
import Image from 'next/image'
export default function ImageComponents({ photos }: { photos: Photo[] }) {
    return (
        <main className={`container mx-auto`}>
            <h1 className={`text-center text-4xl font-bold m-10`}>NextGram</h1>
            <div
                className={`grid grid-cols-1 small-pc:grid-cols-2 mobile:grid-cols-3 light:grid-cols-3 auto-rows-max gap-6 m-10`}
            >
                {photos.map(({ id, imageSrc }) => (
                    <Link key={id} href={`modal/photos/${id}`}>
                        <Image
                            alt=""
                            src={imageSrc}
                            height={500}
                            width={500}
                            className={`w-full object-cover aspect-square`}
                        />
                    </Link>
                ))}
            </div>
        </main>
    )
}
