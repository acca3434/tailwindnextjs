'use client'
import Image from 'next/image'
import { Photo } from '@/photos'
import tw from 'twin.macro'
export default function Frame({ photo }: { photo: Photo }) {
    console.log(photo)

    return (
        <>
            <Image
                alt=""
                src={photo.imageSrc}
                height={600}
                width={600}
                css={tw`w-[400px] object-cover aspect-square col-span-2`}
            />

            <div css={tw`bg-white p-4 px-6`}>
                <h3>{photo.name}</h3>
                <p>Taken by {photo.username}</p>
            </div>
        </>
    )
}
