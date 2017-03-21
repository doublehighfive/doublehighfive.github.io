ig.module(
    'game.entities.health'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {
        EntityHealth = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/healthsprite.png', 32, 32),
            gravityFactor: 0,
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
            }
        });
    });