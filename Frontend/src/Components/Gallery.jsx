import { useRef } from "react";
import useScrollReveal from '../useScrollReveal';
import '../styles/Gallery.css';
const photos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
    alt: 'Team collaboration',
    label: 'Team Collaboration',
    size: 'side',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
    alt: 'Team gathering',
    label: 'Team Gathering',
    size: 'near',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    alt: 'Office celebration',
    label: 'Office Celebrations',
    size: 'center',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    alt: 'Team working',
    label: 'Working Together',
    size: 'near',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    alt: 'Team fun',
    label: 'Our Culture',
    size: 'side',
  },
];
function GalleryPhoto({photo}){
    return(
        <div className={`gallery-photo ${photo.size}`}>
            <img src={photo.src} alt={photo.alt}/>
            <div className="gallery-photo-label">{photo.label}</div>
        </div>
    );
}
function Gallery(){
    const sectionRef=useRef(null);
    useScrollReveal(sectionRef);
    return(
        <section className="gallery" id="gallery" ref={sectionRef}>
            <div className="gallery-inner">
                <div className="gallery-header reveal">
                    <h2 className="gallery-title">
                        Inside the world of HighShine
                    </h2>
                    <p className="gallery-subtitle">Our People,Our Story</p>
                </div>

                <div className="gallery-strip reveal">
                    {photos.map((photo)=>(
                          <GalleryPhoto key={photo.id} photo={photo} />
                    ))}
                </div>
                <div className="gallery-cta reveal">
                    <p>Want to be part of our growing family?</p>
                     <a href="#contact" className="btn-gold">
            Join Our Team →
          </a>
                </div>
            </div>
        </section>
    )
}
export default Gallery;