
import { useState, useEffect, useRef } from 'react';
import './App.css';

const s = (n) => `${n} ${n} ${n}`;

export default function App() {
  const [personaje, setPersonaje] = useState(true);
  const [grande, setGrande] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [detectado, setDetectado] = useState(false);

  const markerRef = useRef(null);

  useEffect(() => {
    const marker = markerRef.current;

    const encontrado = () => {
      console.log("Marcador Hiro detectado");
      setDetectado(true);
    };

    const perdido = () => {
      console.log("Marcador Hiro perdido");
      setDetectado(false);
    };

    if (marker) {
      marker.addEventListener('markerFound', encontrado);
      marker.addEventListener('markerLost', perdido);
    }

    return () => {
      if (marker) {
        marker.removeEventListener('markerFound', encontrado);
        marker.removeEventListener('markerLost', perdido);
      }
    };
  }, []);

  return (
    <>
      <div className="panel">

        <button onClick={() => {
          setPersonaje(!personaje);
          setClicks(clicks + 1);
        }}>
          {personaje ? "objeto" : "personaje"}
        </button>

        <button onClick={() => {
          setGrande(!grande);
          setClicks(clicks + 1);
        }}>
          tamaño
        </button>

        <span>Clics : {clicks}</span>

        <span>
          {detectado
            ? "✅ Hiro detectado"
            : "Buscando Hiro..."}
        </span>

      </div>

      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
        vr-mode-ui="enabled: false"
        renderer="antialias: true; alpha: true"
      >

        <a-marker
          ref={markerRef}
          preset="hiro"
          emitevents="true"
        >

          <a-entity
            scale={s(grande ? 2 : 1)}
            animation="property: position; from: 0 0 0; to: 0 0.3 0; dir: alternate; loop: true; dur: 1000; easing: easeInOutSine"
          >

            {personaje
              ?
              <a-gltf-model
                src="/tiny_planet_friends_3d-tiger-3541.glb"
                scale={s(0.5)}
              />
              :
              <a-box
                position="0 0.5 0"
                color="#d94c4c"
              />
            }

          </a-entity>

        </a-marker>

        <a-entity camera></a-entity>

      </a-scene>
    </>
  );
}
