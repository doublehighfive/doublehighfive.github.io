ig.module(
    'game.entities.blueaphid'
)
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityBlueaphid = ig.Entity.extend({
            animSheet: new ig.AnimationSheet( 'media/blueaphidspritesheet.png', 40, 16 ),
            size: {x: 40, y: 16},
            maxVel: {x: 150, y: 100},
            flip: false,
            friction: {x: 150, y: 0},
            speed: 40,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,
            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim('walk', .25, [0,1]);
            },
            update: function() {

                // near an edge? return!
                if( !ig.game.collisionMap.getTile(
                        this.pos.x + (this.flip ? +4 : this.size.x -4),
                        this.pos.y + this.size.y+1
                    )
                ) {
                    this.flip = !this.flip;
                }
                var xdir = this.flip ? -1 : 1;
                this.vel.x = this.speed * xdir
                if (!this.transformed) {
                    this.currentAnim = this.anims.walk;
                } else {
                    this.currentAnim = this.anims.princesswalk;
                }
                this.currentAnim.flip.x = this.flip;
                this.parent();

            },
            handleMovementTrace: function( res ) {
                this.parent( res );
                // collision with a wall? return!
                if( res.collision.x ) {
                    this.flip = !this.flip;
                }
            },
            check: function( other ) {

                other.receiveDamage(1, this);

            },
            receiveDamage: function(value){
                this.parent(value);
            }

        });
    });