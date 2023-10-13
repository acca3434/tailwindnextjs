import swagPhotos from '@/photos'
import ImageComponents from '@/components/Image'

export default function Modal() {
    const photos = swagPhotos
    if (!photos) return <>데이터가 없습니다.</>
    return <ImageComponents photos={photos} />
}
