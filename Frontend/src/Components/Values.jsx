import { useEffect,useRef } from 'react';
import useScrollReveal from '../useScrollReveal';
import '../styles/Values.css';
const values = [
  {
    icon: '🏆',
    title: 'Commitment to Excellence',
    text: 'We only deliver what we feel is the most effective solution for your needs.',
  },
  {
    icon: '💡',
    title: 'Innovation and Learning',
    text: 'Finding the best ways to learn and develop the tools to your success.',
  },
  {
    icon: '🛡️',
    title: 'Integrity and Transparency',
    text: 'We understand the importance of giving you a birds eye view of the implementation process.',
  },
  {
    icon: '❤️',
    title: 'Customer-Centricity',
    text: 'Keeping customer needs as the core outcomes of our internal processes.',
  },
  {
    icon: '🤝',
    title: 'Collaborative Growth',
    text: 'We heavily imbibe "your step-ups are our step-ups" in our relationships, both internally and externally.',
  },
  {
    icon: '⚖️',
    title: 'Ethics Above All',
    text: 'We conduct business with integrity, adhering to ethics, honesty, and legal compliance for a brighter future.',
  },
];
function ValueCard({value,index}){
    return(
        <div className="value-card reveal" style={{transitionDelay:`${index * 0.1}s`}}>
          <div className="value-icon">{value.icon}</div>
          <h3 className="value-card-title">{value.title}</h3>
          <p className="value-card-text">{value.text}</p>
        </div>
    )
}
function Values(){
    const sectionRef=useRef(null);
    useScrollReveal(sectionRef);
    useEffect(()=>{
        const timer=setTimeout(()=>{
        const observer=new IntersectionObserver(
            (entries)=>{
                entries.forEach((entry)=>{
                    if(entry.isIntersecting){
                        entry.target.classList.add('visible')
                    }
                });
            },
            {threshold:0.5,rootMargin:'0px 0px -50px 0px'}
        );
        if(sectionRef.current){
            const reveals=sectionRef.current.querySelectorAll(
                '.revel,.reveal-left,.reveal-right'
            );
            reveals.forEach((element)=>observer.observe(element));
        }
        return ()=>observer.disconnect();
    },100);
     return () => clearTimeout(timer);
},[]);
    return(
        <section className="values" id="values" ref={sectionRef}>
            <div className="values-inner">
                <div className="values-header reveal">
                    <h2 className="values-title">OUR VALUES</h2>
                    <p className="values-subtitle">
                      Purpose-built principles that address every dimension of our
            operations — from a single, integrated approach.  
                    </p>
                </div>

                <div className="values-grid">
                    {values.map((value,index)=>(
                        <ValueCard key={value.title}
                        value={value}
                        index={index}/>
                    ))}
                </div>
            </div>
        </section>
    )


}
export default Values;
