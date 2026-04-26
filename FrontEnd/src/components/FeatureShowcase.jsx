import { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import Collapse from 'react-bootstrap/Collapse'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

export default function FeatureShowcase({ products }) {
  const [openTips, setOpenTips] = useState(false)
  const slides = products.slice(0, 3)

  return (
    <section className="section section--compact feature-showcase" id="experiencia">
      <div className="container">
        <div className="section-heading">
          <h2>Experiencia interactiva</h2>
          <p>
            Esta seccion integra carrusel, acordeon, collapse, popover y contenido
            multimedia para cumplir los requerimientos funcionales del front.
          </p>
        </div>

        <div className="feature-showcase__grid">
          <article className="feature-card fade-in-up">
            <h3>Carrusel de productos</h3>
            <Carousel fade interval={4200}>
              {slides.map((item) => (
                <Carousel.Item key={item.id}>
                  <img src={item.image} alt={item.name} className="feature-carousel__image" />
                  <Carousel.Caption>
                    <h4>{item.name}</h4>
                    <p>{item.tagline}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </article>

          <article className="feature-card fade-in-up">
            <h3>Soporte de compra (acordeon + collapse)</h3>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Como funcionan las rutas privadas?</Accordion.Header>
                <Accordion.Body>
                  El panel privado solo se habilita despues de autenticarte con usuario
                  y password validos.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Politica de acceso</Accordion.Header>
                <Accordion.Body>
                  El acceso privado esta protegido por autenticacion y no se exponen
                  credenciales en la interfaz publica.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Responsive en movil y tablet</Accordion.Header>
                <Accordion.Body>
                  La grilla, el menu y las tarjetas se adaptan automaticamente para
                  escritorio, tablet y celular.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <div className="feature-actions">
              <Button
                variant="outline-dark"
                onClick={() => setOpenTips((value) => !value)}
                aria-controls="collapse-tip-box"
                aria-expanded={openTips}
              >
                {openTips ? 'Ocultar tips' : 'Ver tips de compra'}
              </Button>

              <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={
                  <Popover id="tip-popover">
                    <Popover.Header as="h3">Tip rapido</Popover.Header>
                    <Popover.Body>
                      Si compras mouse y pad juntos, mejora la precision y la ergonomia.
                    </Popover.Body>
                  </Popover>
                }
              >
                <Button variant="warning">Popover de ayuda</Button>
              </OverlayTrigger>
            </div>

            <Collapse in={openTips}>
              <div id="collapse-tip-box" className="feature-collapse">
                Compara sensibilidad, ergonomia y peso del mouse antes de comprar.
              </div>
            </Collapse>
          </article>
        </div>

        <div className="feature-media">
          <article className="feature-card feature-card--media fade-in-up">
            <h3>Video y sonido</h3>
            <video
              controls
              preload="metadata"
              poster="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
              className="feature-video"
            >
              <source
                src="https://cdn.coverr.co/videos/coverr-man-typing-on-a-keyboard-1579/1080p.mp4"
                type="video/mp4"
              />
            </video>
            <audio controls preload="metadata" className="feature-audio">
              <source
                src="https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a73467.mp3"
                type="audio/mpeg"
              />
            </audio>
            <p className="feature-dropcap">
              Nuestro catalogo prioriza claridad visual, contraste y jerarquia para
              facilitar decisiones de compra rapidas en cualquier dispositivo.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
