ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.level1',
    'game.levels.level2',
    'game.levels.level3',
	'game.levels.titlescreen'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 300,

	init: function() {
		this.loadLevel(LevelTitlescreen);
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.MOUSE1, 'click');
        ig.input.bind( ig.KEY.A, 'left');
        ig.input.bind( ig.KEY.D, 'right');
        ig.input.bind( ig.KEY.W, 'jump');
        ig.input.bind(ig.KEY.E, 'shoot');
        ig.input.bind(ig.KEY.Q, 'throw');
        ig.input.bind(ig.KEY.S, 'down');

	},
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();


		//go to level 2
		var mazedoor = this.getEntitiesByType(EntityMazedoor)[0];
        if (mazedoor && mazedoor.opened == true) {
            this.loadLevel(LevelLevel2);
        }

        //go to level 3

        var endmazetrigger = this.getEntitiesByType(EntityEndmazetrigger)[0];
        if (endmazetrigger && endmazetrigger.triggered == true) {
            this.loadLevel(LevelLevel3);
        }


        //follow player in level 2
		var mazeplayer = this.getEntitiesByType(EntityMazeplayer)[0];
		if (mazeplayer) {
			this.screen.scale = .5;
            this.screen.x = (mazeplayer.pos.x - ig.system.width / 2);
            this.screen.y = (mazeplayer.pos.y - ig.system.width / 2) + 200;
		}

		//follow player in level 1 or 3
		var player = this.getEntitiesByType(EntityPlayer)[0];
		if (player) {
			if (player.pos.x < 336) {
				this.screen.x = 16;
			} else if (player.pos.x > 7840) {
				this.screen.x = 7552 - 16;
			} else {
                this.screen.x = (player.pos.x - ig.system.width / 2);
            }
		}

		var bigbutton = this.getEntitiesByType(EntityBigbutton)[0];
		if(bigbutton) {
            this.screen.x = (player.pos.x - ig.system.width / 2);
            this.screen.y = (player.pos.y - ig.system.height / 2);
		}

		//start game (go to level 1)
		var clicktrigger = this.getEntitiesByType(EntityClicktrigger)[0];
		if(clicktrigger && clicktrigger.clicked == true) {
			this.loadLevel(LevelLevel1);
		}

	},
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 640, 400, 1);

});
