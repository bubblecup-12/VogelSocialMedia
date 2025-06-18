import React, { useState } from 'react';
import './post.css';

export default function Post() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="avatar">R</div>
        <div className="post-header-text">
          <h3>Shrimp and Chorizo Paella</h3>
          <p className="subheader">September 14, 2016</p>
        </div>
        <button className="icon-button more-button" aria-label="settings">
          ⋮
        </button>
      </div>
      <img
        className="post-image"
        src="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <div className="post-content">
        <p>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </p>
      </div>
      <div className="post-actions">
        <button className="icon-button" aria-label="add to favorites">
          <i className="fa fa-heart"></i>
        </button>
        <button className="icon-button" aria-label="share">
          <i className="fa fa-share"></i>
        </button>
        <button
          className={`icon-button expand-button ${expanded ? 'expanded' : ''}`}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <i className="fa fa-chevron-down"></i>
        </button>
      </div>
      {expanded && (
        <div className="post-collapse">
          <h4>Method:</h4>
          <p>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </p>
          <p>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </p>
          <p>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don't open.)
          </p>
          <p>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </p>
        </div>
      )}
    </div>
  );
}
