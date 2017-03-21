ig.module(
    'game.entities.climbtrigger'
)
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityClimbtrigger = ig.Entity.extend({
            size: {x: 16, y: 16},

            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(20, 200, 255, 0.4)',


            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.NEVER,

            init: function( x, y, settings ) {
                if( settings.checks ) {
                    this.checkAgainst = ig.Entity.TYPE[settings.checks.toUpperCase()] || ig.Entity.TYPE.A;
                    delete settings.check;
                }

                this.parent( x, y, settings );
            },

            check: function( other ) {
                other.climbing = true;
                other.gravityFactor = 0;
            },

            update: function(){}
        });

    });