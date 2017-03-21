ig.module(
    'game.entities.mazedoor'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {
        EntityMazedoor = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/mazedoor.png', 128, 192),
            gravityFactor: 0,
            isSensor: true,
            opened: false,
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(20, 200, 255, 0.4)',
            isFixedRotation: true,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.NEVER,

            startPosition: null,

            init: function(x, y, settings) {
                this.addAnim('still', 1, [0]);

                if (settings.check) {
                    this.checkAgainst = ig.Entity.TYPE[settings.checks.toUpperCase()] || ig.Entity.TYPE.A;
                    delete settings.check;
                }

                this.parent(x, y, settings);
            },

            check: function(other) {
                this.opened = true;
                other.kill();
            }

        });
    });