import React from "react";

export default function Intro() {
  return (
    <div className="Intro">
      <section className="slide">
        <p>
          Selon l'European Journal of Social Psychology en 2009 il faudrait en
          moyenne 66 jours pour prendre une nouvelle habitude.
        </p>
        <p>
          Le but de cette application est de pouvoir vous situer en cochant vous
          même chaque jours afin de suivre votre progression.
        </p>
        <button>Suivant</button>
      </section>

      <section className="slide">
        <p>
          Pour l'utiliser c'est très simple, il suffit de rentrer une nouvelle
          habitude à prendre et il ne reste qu'a cocher les jours où vous
          effectuez cette nouvelle habitude
        </p>
        <p>
          Vous pouvez ainsi, creer plusieurs nouvelles habitudes et passer de
          l'une a l'autre au cours de l'année pour voir vos différentes
          habitudes
        </p>
        <button>Suivant</button>
      </section>

      <section className="slide">
        <p>Essayez moi dès maintenant</p>
        <button>Fin</button>
      </section>
    </div>
  );
}
