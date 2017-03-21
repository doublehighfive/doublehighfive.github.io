ig.module(
    'game.entities.clicktrigger'
)
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityClicktrigger = ig.Entity.extend({
            size: {x: 16, y: 16},

            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(196, 255, 0, 0.7)',

            target: null,
            wait: -1,
            waitTimer: null,
            canFire: true,
            clicked: false,

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

            update: function(){
                if (ig.input.pressed('click')) {
                    this.clicked = true;
                }
            }
        });

    });