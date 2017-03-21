ig.module(
    'game.entities.watertrigger'
)
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityWatertrigger = ig.Entity.extend({
            size: {x: 16, y: 16},

            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(20, 200, 255, 0.4)',

            target: null,
            wait: -1,
            waitTimer: null,

            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.NEVER,

            init: function( x, y, settings ) {
                if( settings.checks ) {
                    this.checkAgainst = ig.Entity.TYPE[settings.checks.toUpperCase()] || ig.Entity.TYPE.A;
                    delete settings.check;
                }

                this.parent( x, y, settings );
                this.waitTimer = new ig.Timer();
            },

            check: function( other ) {
                other.gravityFactor = -.1;
                other.swimming = true;
                ig.input.unbind(ig.KEY.A);
            },

            update: function(){}
        });

    });