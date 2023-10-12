'use client'
import Link from 'next/link'
import swagPhotos from '@/photos'
import Image from 'next/image'
import tw from 'twin.macro'
export default function Home() {
    const photos = swagPhotos

    return (
        <main css={tw`container mx-auto`}>
            <h1 css={tw`text-center text-4xl font-bold m-10`}>NextGram</h1>
            <div
                css={tw`grid grid-cols-1 small-pc:grid-cols-2 mobile:grid-cols-3 light:grid-cols-3 auto-rows-max gap-6 m-10`}
            >
                {photos.map(({ id, imageSrc }) => (
                    <Link key={id} href={`modal/photos/${id}`}>
                        <Image
                            alt=""
                            src={imageSrc}
                            height={500}
                            width={500}
                            css={tw`w-full object-cover aspect-square`}
                        />
                    </Link>
                ))}
            </div>
        </main>
    )
}
