class GameScene extends Phaser.Scene {
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  platform!: Phaser.Physics.Arcade.Group;
  cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
  score!: number;
  scoreText!: Phaser.GameObjects.Text;
  maxHeigth!: number;
  lastPlatformY!: number;
  lastPlatformX!: number;

  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("player", "/player/player.png");
  }

  create() {
    this.player = this.physics.add.sprite(50, 100, "player");
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
    this.player.setScrollFactor(1, 0);

    this.cursor = this.input.keyboard!.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    }) as Phaser.Types.Input.Keyboard.CursorKeys;

    this.score = 0;
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "24px",
      color: "#ffffff",
    });
    this.scoreText.setScrollFactor(0);

    this.cameras.main.setBounds(-Infinity, 0, Infinity, 400);
    this.cameras.main.startFollow(this.player);

    this.physics.world.setBounds(-Infinity, 0, Infinity, 400);
    this.player.setVelocityX(200);
  }

  update() {
    // if (this.cursor.up.isDown || this.cursor.space.isDown) {
    //   this.player.setVelocityY(-200);
    // } else {
    //   this.player.setVelocityY(0);
    // }

    if (this.cursor.up.isDown || this.cursor.space.isDown) {
      this.player.setVelocityY(-180);
    } else {
      this.player.setVelocityY(180);
    }

    const currentScore = Math.max(this.score, Math.floor(this.player.x + 500));
    if (currentScore !== this.score) {
      this.score = currentScore;
      this.scoreText.setText("Score: " + this.score);
    }
  }
}

export default GameScene;
