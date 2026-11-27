/* ==========================================================================
   FOOD VERSE — Minimalist Animated ASCII Culinary Showcase Engine
   Supports every food category for Huxley-style dish selection
   ========================================================================== */

(function (global) {
  'use strict';

  const ASCII_SHOWCASES = {
    'valley-club-sandwich': {
      frames: [
        '<span class="ac-steam">      &#10022;        (   )    ~           .   (  )   ~</span>\n' +
        '<span class="ac-steam">    .      ~     ) (      )   &#10022;       ~   )  (</span>',
        '<span class="ac-steam">      .         )  (    ~      &#10022;       (   )    .</span>\n' +
        '<span class="ac-steam">    &#10022;    ~      (   )    (       .      ) (    ~</span>',
        '<span class="ac-steam">      ~         (   )   .      *       )  (    &#10022;</span>\n' +
        '<span class="ac-steam">    .      &#10022;     ) (     ~      .       (  )   )</span>',
        '<span class="ac-steam">      .         )  (    &#10022;      ~       (   )   ~</span>\n' +
        '<span class="ac-steam">    ~      *     (   )    )      &#10022;      ) (   .</span>'
      ],
      body:
        '<span class="ac-sage">                 (</span><span class="ac-tomato">o</span><span class="ac-sage">)</span>\n' +
        '<span class="ac-gold">                  |</span>\n' +
        '<span class="ac-gold">         .-------------------.</span>\n' +
        '<span class="ac-gold">        /  ///   ///   ///   /|</span>\n' +
        '<span class="ac-gold">       /____________________/ |</span>\n' +
        '<span class="ac-gold">       |____________________|/</span>\n' +
        '<span class="ac-tomato">       (  (===)  (===)  (===) )</span>\n' +
        '<span class="ac-cheddar">      ~\\______________________/~</span>\n' +
        '<span class="ac-sage">     ~^~^~^~^~^~^~^~^~^~^~^~^~^~</span>\n' +
        '<span class="ac-ink">       [===|===|===|===|===|===]</span>\n' +
        '<span class="ac-gold">       ._______________________.</span>\n' +
        '<span class="ac-gold">       |_______________________|</span>\n' +
        '<span class="ac-ink">  .=================================.</span>\n' +
        '<span class="ac-ink"> (  </span><span class="ac-sage">~ G R I L L E D   S A N D W I C H ~</span><span class="ac-ink"> )</span>\n' +
        '<span class="ac-ink">  `=================================\'</span>',
      glyph: '[===]'
    },

    'valley-cold-brew': {
      frames: [
        '<span class="ac-steam">        &#10022;       .       *           .     &#10022;</span>\n' +
        '<span class="ac-gold">               //</span><span class="ac-steam">    ~  chilled classic  ~</span>',
        '<span class="ac-steam">        .       &#10022;       .           *     .</span>\n' +
        '<span class="ac-gold">               //</span><span class="ac-steam">      ~ chilled classic ~</span>',
        '<span class="ac-steam">        *       .       &#10022;           .     *</span>\n' +
        '<span class="ac-gold">               //</span><span class="ac-steam">    ~  chilled classic  ~</span>',
        '<span class="ac-steam">        .       *       .           &#10022;     .</span>\n' +
        '<span class="ac-gold">               //</span><span class="ac-steam">      ~ chilled classic ~</span>'
      ],
      body:
        '<span class="ac-gold">              //</span>\n' +
        '<span class="ac-ink">        .----</span><span class="ac-gold">//</span><span class="ac-ink">---------.</span>\n' +
        '<span class="ac-ink">       |  </span><span class="ac-steam">[ ]   [ ]</span><span class="ac-ink">    |</span>\n' +
        '<span class="ac-ink">       |</span><span class="ac-gold">~~~~~~~~~~~~~~~</span><span class="ac-ink">|</span>\n' +
        '<span class="ac-ink">       |</span><span class="ac-cheddar">  .~.~.~.~.~.  </span><span class="ac-ink">|</span>\n' +
        '<span class="ac-ink">       |</span><span class="ac-gold">  :::::::::::  </span><span class="ac-ink">|</span>\n' +
        '<span class="ac-ink">       |</span><span class="ac-ink">  ###########  </span><span class="ac-ink">|</span>\n' +
        '<span class="ac-ink">        \\ ########### /</span>\n' +
        '<span class="ac-ink">         `-----------\'</span>\n' +
        '<span class="ac-sage">      ~  C H I L L E D   S H A K E  ~</span>',
      glyph: '|//|'
    },

    'dosa': {
      frames: [
        '<span class="ac-steam">        ~     (   )       &#10022;         (  )</span>\n' +
        '<span class="ac-steam">      .        ) (         ~         ) (</span>',
        '<span class="ac-steam">        .     )  (        ~         )   (</span>\n' +
        '<span class="ac-steam">      &#10022;       (   )       .         (  )</span>',
        '<span class="ac-steam">        ~     (   )       *         (   )</span>\n' +
        '<span class="ac-steam">      .        ) (        &#10022;          ) (</span>',
        '<span class="ac-steam">        *     )  (        &#10022;         )   (</span>\n' +
        '<span class="ac-steam">      ~       (   )       .         (  )</span>'
      ],
      body:
        '<span class="ac-gold">            .-------------------------.</span>\n' +
        '<span class="ac-gold">          .\'  /  /   /   /   /   /   / \'.</span>\n' +
        '<span class="ac-gold">         /   /  /   /   /   /   /   /    \\</span>\n' +
        '<span class="ac-cheddar">        (   ~~~~~~~~~~~~~~~~~~~~~~~~~~    )</span>\n' +
        '<span class="ac-gold">         \\_______________________________/</span>\n' +
        '<span class="ac-ink">          .-------.   .-------.   .------.</span>\n' +
        '<span class="ac-ink">         ( </span><span class="ac-tomato">sambar</span><span class="ac-ink">  ) ( </span><span class="ac-sage">chutney</span><span class="ac-ink"> ) ( </span><span class="ac-cheddar">ghee</span><span class="ac-ink"> )</span>\n' +
        '<span class="ac-ink">          `-------\'   `-------\'   `------\'</span>\n' +
        '<span class="ac-sage">       ~  M O R N I N G   T I F F I N  ~</span>',
      glyph: '<===>'
    },

    'poha': {
      frames: [
        '<span class="ac-steam">          (   )     ~     &#10022;     (   )</span>\n' +
        '<span class="ac-steam">        .  ) (    (   )    .     ) (</span>',
        '<span class="ac-steam">          )  (     .     ~     &#10022; )  (</span>\n' +
        '<span class="ac-steam">        &#10022; (   )    ) (    *     (   )</span>',
        '<span class="ac-steam">          (   )    &#10022;     .     ~ (   )</span>\n' +
        '<span class="ac-steam">        ~  ) (    (   )   &#10022;     ) (</span>',
        '<span class="ac-steam">          )  (     ~     *     . )  (</span>\n' +
        '<span class="ac-steam">        . (   )    ) (    ~     (   )</span>'
      ],
      body:
        '<span class="ac-sage">                .   *   .   &#10022;</span>\n' +
        '<span class="ac-cheddar">           .-\'\'\'o\'\'\'.\'\'\'o\'\'\'.\'\'\'-.</span>\n' +
        '<span class="ac-cheddar">         .\'   .   \'   o   .   \'   \'.</span>\n' +
        '<span class="ac-ink">        |=============================|</span>\n' +
        '<span class="ac-ink">         \\   </span><span class="ac-gold">~  H O T   B O W L  ~</span><span class="ac-ink">   /</span>\n' +
        '<span class="ac-ink">          \\                         /</span>\n' +
        '<span class="ac-ink">           `-----------------------\'</span>\n' +
        '<span class="ac-ink">         .===========================.</span>',
      glyph: '\\___/'
    },

    'burger': {
      frames: [
        '<span class="ac-steam">          ~     (  )    &#10022;    (  )    ~</span>\n' +
        '<span class="ac-steam">        .        )(      ~    )(     .</span>',
        '<span class="ac-steam">          .     ) (      ~    ) (    &#10022;</span>\n' +
        '<span class="ac-steam">        &#10022;       (  )     .    (  )   ~</span>',
        '<span class="ac-steam">          ~     (  )     *    (  )   .</span>\n' +
        '<span class="ac-steam">        .        )(      &#10022;     )(    ~</span>',
        '<span class="ac-steam">          *     ) (      &#10022;    ) (    ~</span>\n' +
        '<span class="ac-steam">        ~       (  )     .    (  )   &#10022;</span>'
      ],
      body:
        '<span class="ac-gold">             .-----------------.</span>\n' +
        '<span class="ac-gold">           .\'   .    \'    .    \'.</span>\n' +
        '<span class="ac-gold">          /_______________________\\</span>\n' +
        '<span class="ac-sage">         ~^~^~^~^~^~^~^~^~^~^~^~^~^~</span>\n' +
        '<span class="ac-cheddar">         \\_______________________/</span>       <span class="ac-cheddar">| | | |</span>\n' +
        '<span class="ac-tomato">         [=======================]</span>       <span class="ac-cheddar">| | | |</span>\n' +
        '<span class="ac-gold">          \\_____________________/</span>       <span class="ac-tomato">[FRIES]</span>\n' +
        '<span class="ac-ink">      .=======================================.</span>',
      glyph: '(===)'
    },

    'wrap': {
      frames: [
        '<span class="ac-steam">        &#10022;       ~     (   )       .     ~</span>\n' +
        '<span class="ac-steam">      .        (  )    ) (       &#10022;     (  )</span>',
        '<span class="ac-steam">        .       *     )  (       ~     &#10022;</span>\n' +
        '<span class="ac-steam">      &#10022;        ) (    (   )      .     ) (</span>',
        '<span class="ac-steam">        ~       .     (   )      *     .</span>\n' +
        '<span class="ac-steam">      .        (  )    ) (       ~     (  )</span>',
        '<span class="ac-steam">        *       &#10022;     )  (       .     &#10022;</span>\n' +
        '<span class="ac-steam">      ~        ) (    (   )      &#10022;     ) (</span>'
      ],
      body:
        '<span class="ac-sage">                   ~^~^~</span>\n' +
        '<span class="ac-tomato">                  ( o o )</span>\n' +
        '<span class="ac-gold">                 /   /   \\</span>\n' +
        '<span class="ac-gold">                /   /     \\</span>\n' +
        '<span class="ac-gold">               /   /       \\</span>\n' +
        '<span class="ac-ink">              |===|=========|</span>\n' +
        '<span class="ac-ink">              |   |  KATHI  |</span>\n' +
        '<span class="ac-ink">              |   |   ROLL  |</span>\n' +
        '<span class="ac-ink">               \\__|________/</span>\n' +
        '<span class="ac-sage">         ~  H A N D   R O L L E D  ~</span>',
      glyph: '/|||/'
    },

    'pasta': {
      frames: [
        '<span class="ac-steam">          (   )     ~     &#10022;     (   )</span>\n' +
        '<span class="ac-steam">        .  ) (    (   )    .     ) (</span>',
        '<span class="ac-steam">          )  (     .     ~     &#10022; )  (</span>\n' +
        '<span class="ac-steam">        &#10022; (   )    ) (    *     (   )</span>',
        '<span class="ac-steam">          (   )    &#10022;     .     ~ (   )</span>\n' +
        '<span class="ac-steam">        ~  ) (    (   )   &#10022;     ) (</span>',
        '<span class="ac-steam">          )  (     ~     *     . )  (</span>\n' +
        '<span class="ac-steam">        . (   )    ) (    ~     (   )</span>'
      ],
      body:
        '<span class="ac-ink">                    ||</span>\n' +
        '<span class="ac-ink">                   _||_</span>\n' +
        '<span class="ac-cheddar">            .-~~~~/||||\\~~~~-.</span>\n' +
        '<span class="ac-tomato">          .\'  ~  (  o  )  ~   \'.</span>\n' +
        '<span class="ac-cheddar">         /   ~~~~~~~~~~   ~~~~  \\</span>\n' +
        '<span class="ac-ink">        |========================|</span>\n' +
        '<span class="ac-ink">         \\     P A S T A        /</span>\n' +
        '<span class="ac-ink">          `--------------------\'</span>',
      glyph: '{~~~}'
    },

    'pizza': {
      frames: [
        '<span class="ac-steam">         &#10022;      (   )     ~      .    &#10022;</span>\n' +
        '<span class="ac-steam">       .         ) (      &#10022;      ~    ) (</span>',
        '<span class="ac-steam">         .      )  (      *      &#10022;    (  )</span>\n' +
        '<span class="ac-steam">       &#10022;        (   )     ~      .    ) (</span>',
        '<span class="ac-steam">         ~      (   )     &#10022;      *    (  )</span>\n' +
        '<span class="ac-steam">       .         ) (      .      ~    ) (</span>',
        '<span class="ac-steam">         *      )  (      ~      &#10022;    (  )</span>\n' +
        '<span class="ac-steam">       ~        (   )     .      &#10022;    ) (</span>'
      ],
      body:
        '<span class="ac-gold">              .-------------------.</span>\n' +
        '<span class="ac-gold">             /  </span><span class="ac-tomato">o</span><span class="ac-cheddar">   ~   </span><span class="ac-sage">*</span><span class="ac-cheddar">   ~   </span><span class="ac-tomato">o</span><span class="ac-gold">   \\</span>\n' +
        '<span class="ac-gold">             \\    </span><span class="ac-cheddar">~   </span><span class="ac-tomato">o</span><span class="ac-cheddar">   ~   </span><span class="ac-sage">*</span><span class="ac-gold">    /</span>\n' +
        '<span class="ac-gold">              \\     </span><span class="ac-tomato">o</span><span class="ac-cheddar">   ~   </span><span class="ac-tomato">o</span><span class="ac-gold">    /</span>\n' +
        '<span class="ac-gold">               \\     </span><span class="ac-sage">*</span><span class="ac-cheddar">   ~</span><span class="ac-gold">     /</span>\n' +
        '<span class="ac-gold">                \\    </span><span class="ac-tomato">o</span><span class="ac-gold">     /</span>\n' +
        '<span class="ac-gold">                 \\       /</span>\n' +
        '<span class="ac-gold">                  \\     /</span>\n' +
        '<span class="ac-gold">                   \\___/</span>\n' +
        '<span class="ac-ink">       ~  V A L L E Y   P I Z Z A  ~</span>',
      glyph: '<o/*>'
    },

    'wok': {
      frames: [
        '<span class="ac-steam">         (   )    ~      &#10022;     (   )</span>\n' +
        '<span class="ac-steam">       .  ) (   (   )     ~     ) (</span>',
        '<span class="ac-steam">         )  (    .     ~     &#10022; )  (</span>\n' +
        '<span class="ac-steam">       &#10022; (   )   ) (    *     (   )</span>',
        '<span class="ac-steam">         (   )   &#10022;    .      ~ (   )</span>\n' +
        '<span class="ac-steam">       ~  ) (   (   )  &#10022;      ) (</span>',
        '<span class="ac-steam">         )  (    ~    *     . )  (</span>\n' +
        '<span class="ac-steam">       . (   )   ) (   ~     (   )</span>'
      ],
      body:
        '<span class="ac-gold">                 //  //</span>\n' +
        '<span class="ac-gold">                //  //</span>\n' +
        '<span class="ac-cheddar">          .~.~.//~~//~.~.~.</span>\n' +
        '<span class="ac-sage">         (  ~  </span><span class="ac-tomato">*</span><span class="ac-sage">  ~  ~  </span><span class="ac-tomato">*</span><span class="ac-sage">  )</span>\n' +
        '<span class="ac-ink">     ----|=================|----</span>\n' +
        '<span class="ac-ink">          \\   F R O M   W O K /</span>\n' +
        '<span class="ac-ink">           \\_________________/</span>',
      glyph: '//~//'
    },

    'atmosphere-paratha-platter': {
      frames: [
        '<span class="ac-steam">        ~   (  )     &#10022;        (   )   ~</span>\n' +
        '<span class="ac-steam">      .       ) (       ~       )  (      .</span>',
        '<span class="ac-steam">        .   )  (     ~        )   (   &#10022;</span>\n' +
        '<span class="ac-steam">      &#10022;      (   )     .       (  )      ~</span>',
        '<span class="ac-steam">        ~   (   )    .        (   )   *</span>\n' +
        '<span class="ac-steam">      .      ) (      &#10022;        )  (     .</span>',
        '<span class="ac-steam">        *   )  (     &#10022;        )   (   ~</span>\n' +
        '<span class="ac-steam">      ~      (   )     .       (  )     &#10022;</span>'
      ],
      body:
        '<span class="ac-gold">                .-----------.</span>\n' +
        '<span class="ac-gold">            .-\'   </span><span class="ac-cheddar">[MAKHAN]</span><span class="ac-gold">    \'-.</span>        <span class="ac-cobalt">.-------.</span>\n' +
        '<span class="ac-gold">          .\'   o    \'   .    o   \'.</span>     <span class="ac-cobalt">(</span> <span class="ac-steam">raita</span> <span class="ac-cobalt">)</span>\n' +
        '<span class="ac-gold">         /   .    (  ( )  )    \'   \\</span>    <span class="ac-cobalt"> `-----`</span>\n' +
        '<span class="ac-gold">        ;  o    (    \'    )     o   ;</span>\n' +
        '<span class="ac-gold">        |   \'    `-------\'    .     |</span>    <span class="ac-sage">.-------.</span>\n' +
        '<span class="ac-gold">         \\    o      \'      o      /</span>    <span class="ac-sage">(</span> <span class="ac-sage">mint</span>  <span class="ac-sage">)</span>\n' +
        '<span class="ac-gold">          \'.    .        o      .\'</span>      <span class="ac-sage"> `-----`</span>\n' +
        '<span class="ac-gold">            \'-.     \'       .-\'</span>\n' +
        '<span class="ac-gold">                `-----------\'</span>\n' +
        '<span class="ac-ink">  .==============================================.</span>\n' +
        '<span class="ac-ink"> (   </span><span class="ac-cobalt">~  S T U F F E D   P A R A T H A  ~</span><span class="ac-ink">          )</span>\n' +
        '<span class="ac-ink">  `==============================================\'</span>',
      glyph: '(o.o)'
    },

    'atmosphere-kulhad-chai': {
      frames: [
        '<span class="ac-steam">            (   )      ~     &#10022;     (  )</span>\n' +
        '<span class="ac-steam">          .  ) (    (   )     .     ) (</span>\n' +
        '<span class="ac-steam">            (   )    ) (     ~     (   )</span>',
        '<span class="ac-steam">            )  (     .     ~     &#10022; )  (</span>\n' +
        '<span class="ac-steam">          &#10022; (   )    ) (     *      (  )</span>\n' +
        '<span class="ac-steam">            )  (    (   )    .      ) (</span>',
        '<span class="ac-steam">            (   )    &#10022;     .     ~   (  )</span>\n' +
        '<span class="ac-steam">          ~  ) (    (   )    &#10022;      ) (</span>\n' +
        '<span class="ac-steam">            (   )    ) (     .     (   )</span>',
        '<span class="ac-steam">            )  (     ~     *     .   )  (</span>\n' +
        '<span class="ac-steam">          . (   )    ) (     ~      (  )</span>\n' +
        '<span class="ac-steam">            )  (    (   )    &#10022;      ) (</span>'
      ],
      body:
        '<span class="ac-gold">                 /</span>\n' +
        '<span class="ac-tomato">          .-----</span><span class="ac-gold">/</span><span class="ac-tomato">-----.</span>\n' +
        '<span class="ac-tomato">         ( </span><span class="ac-cheddar">~ brewed ~</span><span class="ac-tomato">  )</span>\n' +
        '<span class="ac-tomato">          |~~~~~~~~~~~|</span>\n' +
        '<span class="ac-tomato">          |   KULHAD  |</span>\n' +
        '<span class="ac-tomato">           \\  CHAI   /</span>\n' +
        '<span class="ac-tomato">            \\_______/</span>\n' +
        '<span class="ac-ink">        .===============.</span>\n' +
        '<span class="ac-ink">       (  </span><span class="ac-cobalt">H O T   B R E W</span><span class="ac-ink"> )</span>\n' +
        '<span class="ac-ink">        `===============\'</span>',
      glyph: '|~~~|'
    },

    'sweet': {
      frames: [
        '<span class="ac-steam">          &#10022;      (  )      ~       *      &#10022;</span>\n' +
        '<span class="ac-steam">        .        )(       &#10022;       ~      .</span>',
        '<span class="ac-steam">          .      ) (      *       &#10022;      ~</span>\n' +
        '<span class="ac-steam">        &#10022;       (  )      .       *      .</span>',
        '<span class="ac-steam">          ~      (  )      &#10022;       .      *</span>\n' +
        '<span class="ac-steam">        .        )(       ~       &#10022;      .</span>',
        '<span class="ac-steam">          *      ) (      .       ~      &#10022;</span>\n' +
        '<span class="ac-steam">        ~       (  )      *       .      &#10022;</span>'
      ],
      body:
        '<span class="ac-gold">               .---.    .---.</span>\n' +
        '<span class="ac-gold">             .\'  *  \'..\'  *  \'.</span>\n' +
        '<span class="ac-cheddar">            (   ( )      ( )   )</span>\n' +
        '<span class="ac-ink">           |====================|</span>\n' +
        '<span class="ac-ink">            \\  </span><span class="ac-cobalt">S W E E T   D I P</span><span class="ac-ink"> /</span>\n' +
        '<span class="ac-ink">             `------------------\'</span>',
      glyph: '(o o)'
    },

    'sdg-9': {
      frames: [
        '<span class="ac-steam">      &#10022;    &gt; &gt;   [ S Y N C   O N L I N E ]   &lt; &lt;    &#10022;</span>\n' +
        '<span class="ac-cheddar">        o--------&gt;--------o--------&gt;--------o</span>',
        '<span class="ac-steam">      .     &gt; &gt;   [ S Y N C   O N L I N E ]   &lt; &lt;     .</span>\n' +
        '<span class="ac-cheddar">        *--------&gt;--------*--------&gt;--------*</span>',
        '<span class="ac-steam">      &#10022;     &lt; &lt;   [ L I V E   S T A T U S ]   &gt; &gt;    &#10022;</span>\n' +
        '<span class="ac-cheddar">        o--------&lt;--------o--------&lt;--------o</span>',
        '<span class="ac-steam">      *     &gt; &gt;   [ L I V E   S T A T U S ]   &lt; &lt;     *</span>\n' +
        '<span class="ac-cheddar">        +--------&gt;--------o--------&gt;--------+</span >'
      ],
      body:
        '<span class="ac-sage">              +-----------------------+</span>\n' +
        '<span class="ac-sage">              |   </span><span class="ac-ink">FOOD VERSE PORTAL</span><span class="ac-sage">   |</span>\n' +
        '<span class="ac-sage">              +-----------+-----------+</span>\n' +
        '<span class="ac-gold">                          |</span>\n' +
        '<span class="ac-gold">            .-------------+-------------.</span>\n' +
        '<span class="ac-gold">            |                           |</span>\n' +
        '<span class="ac-ink">    +-------+-------+           +-------+-------+</span>\n' +
        '<span class="ac-ink">    |  </span><span class="ac-gold">VALLEY CAFE</span><span class="ac-ink">  |           | </span><span class="ac-cobalt">ATMOSPHERE</span><span class="ac-ink">   |</span>\n' +
        '<span class="ac-ink">    |  </span><span class="ac-steam">[78 ITEMS]</span><span class="ac-ink">   |           |  </span><span class="ac-steam">[72 ITEMS]</span><span class="ac-ink">  |</span>\n' +
        '<span class="ac-ink">    +---------------+           +---------------+</span>\n' +
        '<span class="ac-gold">            \\                           /</span>\n' +
        '<span class="ac-cheddar">             `----[ UNIFIED QUEUE ]----\'</span>\n' +
        '<span class="ac-steam">        S D G  0 9 :  I N F R A S T R U C T U R E</span>',
      glyph: '[09]'
    },

    'sdg-12': {
      frames: [
        '<span class="ac-steam">        ~     (  PRE-ORDER  )  --&gt;  (  EXACT PREP  )     ~</span>\n' +
        '<span class="ac-cheddar">      &#10022;           ^                               v          &#10022;</span>',
        '<span class="ac-steam">        .     (  PRE-ORDER  )  --&gt;  (  EXACT PREP  )     .</span>\n' +
        '<span class="ac-cheddar">      *           |          </span><span class="ac-sage">ZERO WASTE</span><span class="ac-cheddar">          |          *</span>',
        '<span class="ac-steam">        ~     (  ZERO PAPER )  &lt;--  (  TIME SLOTS  )     ~</span>\n' +
        '<span class="ac-cheddar">      &#10022;           ^                               v          &#10022;</span>',
        '<span class="ac-steam">        *     (  ZERO PAPER )  &lt;--  (  TIME SLOTS  )     *</span>\n' +
        '<span class="ac-cheddar">      .           |         </span><span class="ac-sage">DIGITAL PASS</span><span class="ac-cheddar">         |          .</span>'
      ],
      body:
        '<span class="ac-gold">              .-----------.       .-----------.</span>\n' +
        '<span class="ac-gold">            .\'   </span><span class="ac-ink">DEMAND</span><span class="ac-gold">    \'.   .\'   </span><span class="ac-ink">KITCHEN</span><span class="ac-gold">   \'.</span>\n' +
        '<span class="ac-ink">           (    </span><span class="ac-cheddar">VISIBILITY</span><span class="ac-ink">   ) (   </span><span class="ac-cheddar">PRECISION</span><span class="ac-ink">    )</span>\n' +
        '<span class="ac-gold">            \'.     o     .\'   \'.     o     .\'</span>\n' +
        '<span class="ac-gold">              `---------\'       `---------\'</span>\n' +
        '<span class="ac-ink">            +-------------------------------+</span>\n' +
        '<span class="ac-ink">            |  </span><span class="ac-sage">DIGITAL PASS :  FV - 4092</span><span class="ac-ink">    |</span>\n' +
        '<span class="ac-ink">            |  </span><span class="ac-steam">NO PAPER SLIPS · NO SURPLUS</span><span class="ac-ink">  |</span>\n' +
        '<span class="ac-ink">            +-------------------------------+</span>\n' +
        '<span class="ac-steam">       S D G  1 2 :  R E S P O N S I B L E   U S E</span>',
      glyph: '(oo)'
    },

    'sdg-3': {
      frames: [
        '<span class="ac-cheddar">        ----/\\------/\\----</span>   <span class="ac-steam">~  balanced break  ~</span>   <span class="ac-cheddar">----/\\----</span>\n' +
        '<span class="ac-steam">      &#10022;       \\/      \\/       </span><span class="ac-sage">no skipped meals</span><span class="ac-steam">        \\/     &#10022;</span>',
        '<span class="ac-cheddar">        -----/\\------/\\---</span>   <span class="ac-steam">.  calm dining  .</span>     <span class="ac-cheddar">-----/\\---</span>\n' +
        '<span class="ac-steam">      .        \\/      \\/      </span><span class="ac-sage">no peak crowding</span><span class="ac-steam">         \\/     .</span>',
        '<span class="ac-cheddar">        ------/\\------/\\--</span>   <span class="ac-steam">~  timely meals  ~</span>    <span class="ac-cheddar">------/\\--</span>\n' +
        '<span class="ac-steam">      &#10022;         \\/      \\/     </span><span class="ac-sage">nutritious fuel</span><span class="ac-steam">          \\/    &#10022;</span>',
        '<span class="ac-cheddar">        ---/\\------/\\-----</span>   <span class="ac-steam">*  student health  *</span>  <span class="ac-cheddar">---/\\-----</span>\n' +
        '<span class="ac-steam">      *      \\/      \\/        </span><span class="ac-sage">zero queue stress</span><span class="ac-steam">        \\/    *</span>'
      ],
      body:
        '<span class="ac-gold">                   .-----------.</span>\n' +
        '<span class="ac-gold">                 .\'   </span><span class="ac-ink">12 : 30</span><span class="ac-gold">   \'.</span>\n' +
        '<span class="ac-ink">                (   </span><span class="ac-cheddar">LUNCH BREAK</span><span class="ac-ink">   )</span>\n' +
        '<span class="ac-gold">                 \'.   </span><span class="ac-sage">ON TIME</span><span class="ac-gold">   .\'</span>\n' +
        '<span class="ac-gold">                   `-----------\'</span>\n' +
        '<span class="ac-ink">          .=============================.</span>\n' +
        '<span class="ac-ink">         (  </span><span class="ac-sage">[+]</span><span class="ac-ink">   </span><span class="ac-cobalt">N O U R I S H E D</span><span class="ac-ink">   </span><span class="ac-sage">[+]</span><span class="ac-ink">  )</span>\n' +
        '<span class="ac-ink">          `=============================\'</span>\n' +
        '<span class="ac-steam">         S D G  0 3 :  G O O D   H E A L T H</span>',
      glyph: '[+]'
    }
  };

  function resolveAsciiKey(idOrCategory) {
    if (ASCII_SHOWCASES[idOrCategory]) return idOrCategory;
    const s = String(idOrCategory || '').toLowerCase();
    if (s.includes('gulab') || s.includes('sweet scoop')) return 'sweet';
    if (s.includes('paratha') || s.includes('kulche') || s.includes('bhature') || s.includes('raita')) return 'atmosphere-paratha-platter';
    if (s.includes('chai') || (s.includes('tea') && !s.includes('iced')) || (s.includes('coffee') && !s.includes('cold')) || s.includes('hot chocolate')) return 'atmosphere-kulhad-chai';
    if (s.includes('shake') || s.includes('cold coffee') || s.includes('cold chocolate') || s.includes('iced tea') || s.includes('lassi') || s.includes('mojito') || s.includes('buttermilk')) return 'valley-cold-brew';
    if (s.includes('dosa') || s.includes('uttapam')) return 'dosa';
    if (s.includes('pizza')) return 'pizza';
    if (s.includes('pasta') || s.includes('maggi')) return 'pasta';
    if (s.includes('burger') || s.includes('fries') || s.includes('wedges') || s.includes('strips')) return 'burger';
    if (s.includes('wrap') || s.includes('frankie') || s.includes('roll')) return 'wrap';
    if (s.includes('wok') || s.includes('noodles') || s.includes('fried rice') || s.includes('manchurian') || s.includes('chilly') || s.includes('wings') || s.includes('korean') || s.includes('thai')) return 'wok';
    if (s.includes('poha') || s.includes('misal') || s.includes('meal') || s.includes('combo') || s.includes('rice') || s.includes('khichdi') || s.includes('biryani') || s.includes('bowl') || s.includes('bhaji') || s.includes('salad') || s.includes('nachos') || s.includes('boiled egg')) return 'poha';
    return 'valley-club-sandwich';
  }

  function getGlyph(idOrCategory) {
    const key = resolveAsciiKey(idOrCategory);
    return (ASCII_SHOWCASES[key] && ASCII_SHOWCASES[key].glyph) || '[===]';
  }

  function createStage(canvasOrContainer, initialModelId, options) {
    if (!canvasOrContainer) return null;
    const opts = Object.assign({ compact: false }, options || {});
    const isCanvas = canvasOrContainer.tagName === 'CANVAS';
    const parent = isCanvas ? (canvasOrContainer.parentElement || canvasOrContainer) : canvasOrContainer;

    if (isCanvas) {
      canvasOrContainer.style.display = 'none';
    }

    let stageEl = parent.querySelector('.ascii-stage');
    if (!stageEl) {
      stageEl = document.createElement('div');
      stageEl.className = 'ascii-stage' + (opts.compact || opts.shadows === false ? ' ascii-stage--compact' : '');
      stageEl.innerHTML =
        '<div class="ascii-stage__scene">' +
          '<div class="ascii-art ascii-art--steam"></div>' +
          '<div class="ascii-art ascii-art--body"></div>' +
        '</div>';
      parent.appendChild(stageEl);
    }

    const sceneEl = stageEl.querySelector('.ascii-stage__scene');
    const steamEl = stageEl.querySelector('.ascii-art--steam');
    const bodyEl = stageEl.querySelector('.ascii-art--body');

    let currentKey = resolveAsciiKey(initialModelId);
    let frameIdx = 0;
    let isVisible = true;
    let timer = null;

    function renderFrame() {
      const spec = ASCII_SHOWCASES[currentKey] || ASCII_SHOWCASES['valley-club-sandwich'];
      if (!spec) return;
      steamEl.innerHTML = spec.frames[frameIdx % spec.frames.length];
    }

    function loadModel(modelId) {
      currentKey = resolveAsciiKey(modelId);
      frameIdx = 0;
      const spec = ASCII_SHOWCASES[currentKey] || ASCII_SHOWCASES['valley-club-sandwich'];
      if (!spec) return;

      steamEl.innerHTML = spec.frames[0];
      bodyEl.innerHTML = spec.body;

      if (typeof global.gsap !== 'undefined') {
        global.gsap.fromTo(
          sceneEl,
          { opacity: 0.3, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform' }
        );
      }
    }

    if (typeof global.IntersectionObserver !== 'undefined') {
      new global.IntersectionObserver(function (entries) {
        isVisible = entries[0].isIntersecting;
      }, { threshold: 0.05 }).observe(stageEl);
    }

    loadModel(initialModelId);

    timer = setInterval(function () {
      if (!isVisible) return;
      frameIdx = (frameIdx + 1) % 4;
      renderFrame();
    }, 450);

    return {
      loadModel: loadModel,
      destroy: function () {
        if (timer) clearInterval(timer);
      }
    };
  }

  global.FoodVerse3D = {
    createStage: createStage,
    resolveAsciiKey: resolveAsciiKey,
    getGlyph: getGlyph
  };
})(window);
