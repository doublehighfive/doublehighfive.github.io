ig.module(
    'game.entities.dandelion'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {
        EntityDandelion = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/dandelion.png', 32, 64),
            size: {x: 32, y: 64},
            gravityFactor: 0,
            isSensor: true,
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
                other.flying = true;
                ig.input.unbind(ig.KEY.A);
                this.kill();
            }

        });
    });