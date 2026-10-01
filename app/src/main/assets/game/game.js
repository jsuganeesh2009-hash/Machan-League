/**
 * MACHAN LEAGUE - 3 vs 3 Tactical Top-Down Shooting Game
 * Complete Engine with Smart AI, Physics, Particle Systems & Cross-Platform Controls
 */

(function () {
  'use strict';

  // ===================== ROSTER DEFINITION =====================
  // ===================== ROSTER DEFINITION WITH ABILITIES =====================
  const CHARACTERS_DATA = [
    // TEAM A
    {
      id: 'suganeesh',
      name: 'Suganeesh',
      title: 'Blaze 🔥',
      team: 'A',
      role: 'Assault Rifle',
      weaponName: 'Pulsar Rifle',
      weaponType: 'rifle',
      abilityName: 'Fire Burst',
      abilityIcon: '🔥',
      abilityCooldown: 10,
      abilityDesc: 'Deals 45 fiery blast damage to all nearby enemies in range.',
      maxHp: 100,
      speed: 180,
      damage: 18,
      fireRate: 0.16,      // seconds between shots
      burstCount: 1,
      spread: 0.05,
      bulletSpeed: 750,
      bulletColor: '#00e5ff',
      bulletRadius: 3.5,
      clipSize: 30,
      reloadTime: 1.4,
      color: '#00b0ff',
      accentColor: '#00e5ff',
      avatarChar: 'S',
      dashCooldown: 2.2,
      dashSpeed: 440,
      dashDuration: 0.22,
    },
    {
      id: 'karthikeyan',
      name: 'Karthikeyan',
      title: 'Tank 🛡️',
      team: 'A',
      role: 'Shotgun Brawler',
      weaponName: 'Scatter Cannon',
      weaponType: 'shotgun',
      abilityName: 'Shield Wall',
      abilityIcon: '🛡️',
      abilityCooldown: 12,
      abilityDesc: 'Shield barrier that reduces incoming damage by 75% for 4.5s.',
      maxHp: 100,
      speed: 165,
      damage: 10,          // 6 pellets * 10 = 60 potential damage
      pelletCount: 6,
      fireRate: 0.68,
      spread: 0.32,
      bulletSpeed: 620,
      bulletColor: '#40c4ff',
      bulletRadius: 3.0,
      clipSize: 8,
      reloadTime: 1.8,
      color: '#0277bd',
      accentColor: '#29b6f6',
      avatarChar: 'K',
      dashCooldown: 2.5,
      dashSpeed: 400,
      dashDuration: 0.22,
    },
    {
      id: 'jaswanth',
      name: 'Jaswanth',
      title: 'Dash ⚡',
      team: 'A',
      role: 'Sniper Scout',
      weaponName: 'Rail Sniper',
      weaponType: 'sniper',
      abilityName: 'Quick Dash',
      abilityIcon: '⚡',
      abilityCooldown: 8,
      abilityDesc: 'Lightning-fast invulnerable warp dash across short distance.',
      maxHp: 100,
      speed: 175,
      damage: 55,
      fireRate: 1.15,
      spread: 0.015,
      bulletSpeed: 1050,
      bulletColor: '#80d8ff',
      bulletRadius: 4.5,
      clipSize: 5,
      reloadTime: 1.9,
      color: '#01579b',
      accentColor: '#80d8ff',
      avatarChar: 'J',
      dashCooldown: 2.2,
      dashSpeed: 460,
      dashDuration: 0.24,
    },
    // TEAM B
    {
      id: 'sudharsan',
      name: 'Sudharsan',
      title: 'Medic 💚',
      team: 'B',
      role: 'Dual Pistols',
      weaponName: 'Twin Stingers',
      weaponType: 'pistols',
      abilityName: 'Heal',
      abilityIcon: '💚',
      abilityCooldown: 15,
      abilityDesc: 'Restores +40 HP to self and +35 HP to nearby teammates.',
      maxHp: 100,
      speed: 200,
      damage: 13,
      fireRate: 0.12,
      spread: 0.08,
      bulletSpeed: 700,
      bulletColor: '#ff9100',
      bulletRadius: 3.2,
      clipSize: 24,
      reloadTime: 1.3,
      color: '#ef6c00',
      accentColor: '#ffab40',
      avatarChar: 'Su',
      dashCooldown: 1.9,
      dashSpeed: 480,
      dashDuration: 0.22,
    },
    {
      id: 'sakin',
      name: 'Sakin',
      title: 'Shadow 👤',
      team: 'B',
      role: 'Plasma Blaster',
      weaponName: 'Vortex Blaster',
      weaponType: 'plasma',
      abilityName: 'Stealth',
      abilityIcon: '👤',
      abilityCooldown: 14,
      abilityDesc: 'Becomes semi-invisible for 5s; enemies lose target lock & speed +25%.',
      maxHp: 100,
      speed: 175,
      damage: 32,
      splashRadius: 45,
      splashDamage: 18,
      fireRate: 0.58,
      spread: 0.04,
      bulletSpeed: 580,
      bulletColor: '#ff3d00',
      bulletRadius: 5.5,
      clipSize: 12,
      reloadTime: 1.6,
      color: '#d84315',
      accentColor: '#ff7043',
      avatarChar: 'Sa',
      dashCooldown: 2.4,
      dashSpeed: 420,
      dashDuration: 0.22,
    },
    {
      id: 'sriram',
      name: 'Sriram',
      title: 'Sniper 🎯',
      team: 'B',
      role: 'Minigunner',
      weaponName: 'Vulcan Minigun',
      weaponType: 'minigun',
      abilityName: 'Precision Shot',
      abilityIcon: '🎯',
      abilityCooldown: 12,
      abilityDesc: 'Fires one devastating piercing sniper beam dealing 80 damage.',
      maxHp: 100,
      speed: 155,
      damage: 11,
      fireRate: 0.085,
      spread: 0.14,
      bulletSpeed: 740,
      bulletColor: '#ff1744',
      bulletRadius: 3.2,
      clipSize: 45,
      reloadTime: 2.1,
      color: '#c62828',
      accentColor: '#ff5252',
      avatarChar: 'Sr',
      dashCooldown: 2.6,
      dashSpeed: 380,
      dashDuration: 0.2,
    }
  ];

  // ===================== GAME STATE & WORLD =====================
  const WORLD_WIDTH = 1600;
  const WORLD_HEIGHT = 1100;

  class Game {
    constructor() {
      this.canvas = document.getElementById('gameCanvas');
      this.ctx = this.canvas.getContext('2d');

      this.scoreA = 0;
      this.scoreB = 0;
      this.matchDuration = 150; // 2:30
      this.matchTimer = this.matchDuration;
      this.isPaused = false;
      this.isGameOver = false;

      this.controlledCharId = 'suganeesh'; // default player is Suganeesh
      this.players = [];
      this.bullets = [];
      this.particles = [];
      this.floatTexts = [];
      this.obstacles = [];
      this.healthPacks = [];

      // Screen shake
      this.shakeDuration = 0;
      this.shakeIntensity = 0;

      // Settings
      this.settings = {
        sfx: true,
        touchControls: 'auto', // 'auto', 'always', 'never'
        autoAim: true
      };

      // Camera
      this.camera = { x: 0, y: 0, scale: 1 };

      // Input State
      this.keys = {};
      this.mouse = { x: 0, y: 0, isDown: false, worldX: 0, worldY: 0 };
      this.touchMove = { active: false, startX: 0, startY: 0, currX: 0, currY: 0, dx: 0, dy: 0 };
      this.touchAim = { active: false, dx: 0, dy: 0, angle: 0 };
      this.isFiringTouch = false;

      this.lastTime = performance.now();

      this.initDom();
      this.initInput();
      this.resize();
      window.addEventListener('resize', () => this.resize());

      this.startRound();
      requestAnimationFrame(this.loop.bind(this));
    }

    // ===================== ARENA LEVEL DESIGN =====================
    createMap() {
      this.obstacles = [];
      this.healthPacks = [];

      // Outer boundary walls
      const wallThickness = 30;
      this.obstacles.push(
        { x: 0, y: 0, w: WORLD_WIDTH, h: wallThickness, type: 'wall', hp: 9999 },
        { x: 0, y: WORLD_HEIGHT - wallThickness, w: WORLD_WIDTH, h: wallThickness, type: 'wall', hp: 9999 },
        { x: 0, y: 0, w: wallThickness, h: WORLD_HEIGHT, type: 'wall', hp: 9999 },
        { x: WORLD_WIDTH - wallThickness, y: 0, w: wallThickness, h: WORLD_HEIGHT, type: 'wall', hp: 9999 }
      );

      // Central Command Bunker
      this.obstacles.push(
        { x: 740, y: 340, w: 120, h: 36, type: 'wall', hp: 9999 },
        { x: 740, y: 724, w: 120, h: 36, type: 'wall', hp: 9999 },
        { x: 680, y: 480, w: 36, h: 140, type: 'wall', hp: 9999 },
        { x: 884, y: 480, w: 36, h: 140, type: 'wall', hp: 9999 }
      );

      // Flank Barriers Team A side (Left)
      this.obstacles.push(
        { x: 380, y: 220, w: 140, h: 32, type: 'wall', hp: 9999 },
        { x: 380, y: 848, w: 140, h: 32, type: 'wall', hp: 9999 },
        { x: 300, y: 450, w: 36, h: 200, type: 'wall', hp: 9999 }
      );

      // Flank Barriers Team B side (Right)
      this.obstacles.push(
        { x: 1080, y: 220, w: 140, h: 32, type: 'wall', hp: 9999 },
        { x: 1080, y: 848, w: 140, h: 32, type: 'wall', hp: 9999 },
        { x: 1264, y: 450, w: 36, h: 200, type: 'wall', hp: 9999 }
      );

      // Destructible Supply Crates (hp: 60)
      const crateCoords = [
        { x: 440, y: 380 }, { x: 440, y: 700 },
        { x: 1120, y: 380 }, { x: 1120, y: 700 },
        { x: 780, y: 230 }, { x: 780, y: 830 },
        { x: 550, y: 530 }, { x: 1010, y: 530 }
      ];
      crateCoords.forEach(pos => {
        this.obstacles.push({
          x: pos.x, y: pos.y, w: 42, h: 42,
          type: 'crate', hp: 60, maxHp: 60
        });
      });

      // Explosive Fuel Barrels (deal high AOE damage when blown up!)
      const barrelCoords = [
        { x: 590, y: 300 },
        { x: 970, y: 300 },
        { x: 590, y: 770 },
        { x: 970, y: 770 },
        { x: 800, y: 530 }
      ];
      barrelCoords.forEach(pos => {
        this.obstacles.push({
          x: pos.x, y: pos.y, radius: 20,
          type: 'barrel', hp: 45, maxHp: 45
        });
      });

      // Regenerative Energy Health Pads (Top & Bottom Center)
      this.healthPacks = [
        { x: 800, y: 150, radius: 24, respawnTimer: 0, maxRespawn: 18, active: true },
        { x: 800, y: 950, radius: 24, respawnTimer: 0, maxRespawn: 18, active: true }
      ];
    }

    // ===================== SPAWN PLAYERS =====================
    startRound() {
      this.createMap();
      this.bullets = [];
      this.particles = [];
      this.floatTexts = [];
      this.matchTimer = this.matchDuration;
      this.isGameOver = false;

      // Spawn positions
      // Team A spawns along left zone
      const teamAPos = [
        { x: 150, y: 350 },
        { x: 120, y: 550 },
        { x: 150, y: 750 }
      ];
      // Team B spawns along right zone
      const teamBPos = [
        { x: 1450, y: 350 },
        { x: 1480, y: 550 },
        { x: 1450, y: 750 }
      ];

      this.players = CHARACTERS_DATA.map((data, idx) => {
        const isTeamA = data.team === 'A';
        const pos = isTeamA ? teamAPos[idx] : teamBPos[idx - 3];
        const isUserControlled = data.id === this.controlledCharId;

        return {
          ...data,
          x: pos.x,
          y: pos.y,
          radius: 20,
          hp: data.maxHp,
          ammo: data.clipSize,
          isReloading: false,
          reloadProgress: 0,
          fireCooldown: 0,
          dashCooldownTimer: 0,
          isDashing: false,
          dashTimer: 0,
          dashVx: 0,
          dashVy: 0,
          // Ability State
          abilityCooldownTimer: 0,
          shieldActiveTimer: 0,
          stealthActiveTimer: 0,
          isInvulnerableDash: false,
          aimAngle: isTeamA ? 0 : Math.PI,
          vx: 0,
          vy: 0,
          isDead: false,
          isPlayer: isUserControlled,
          kills: 0,
          damageDealt: 0,
          shotsFired: 0,
          shotsHit: 0,
          // AI fields
          aiState: 'patrol',
          aiTarget: null,
          aiDecisionTimer: Math.random() * 0.5,
          aiStrafeDir: Math.random() > 0.5 ? 1 : -1,
          aiStrafeTimer: 1 + Math.random(),
          damageFlash: 0
        };
      });

      this.updateRosterHud();
      this.updatePlayerHud();
      this.hideModals();
      this.notifyStatus('ROUND START - ELIMINATE OPPONENTS!');
    }

    // ===================== INPUT HANDLING =====================
    initInput() {
      window.addEventListener('keydown', (e) => {
        this.keys[e.key.toLowerCase()] = true;

        if (e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          this.triggerPlayerDash();
        }
        if (e.key.toLowerCase() === 'e') {
          e.preventDefault();
          this.triggerPlayerAbility();
        }
        if (e.key.toLowerCase() === 'r') {
          this.triggerPlayerReload();
        }
        if (e.key.toLowerCase() === 'p' || e.key === 'Escape') {
          this.togglePause();
        }
      });

      window.addEventListener('keyup', (e) => {
        this.keys[e.key.toLowerCase()] = false;
      });

      // Mouse Aim & Shoot
      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });

      this.canvas.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
          this.mouse.isDown = true;
          window.soundManager.resume();
        }
      });

      window.addEventListener('mouseup', (e) => {
        if (e.button === 0) {
          this.mouse.isDown = false;
        }
      });

      // Mobile Touch Joystick & Buttons
      this.setupTouchControls();
    }

    setupTouchControls() {
      const joystickZone = document.getElementById('joystickZone');
      const joystickStick = document.getElementById('joystickStick');
      const btnFire = document.getElementById('btnMobileFire');
      const btnDash = document.getElementById('btnMobileDash');
      const btnReload = document.getElementById('btnMobileReload');
      const btnAutoAim = document.getElementById('btnMobileAutoAim');

      // Virtual Joystick on Touch
      const maxDist = 45;
      let activeTouchId = null;

      const handleTouchStart = (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
          const t = e.changedTouches[i];
          const rect = joystickZone.getBoundingClientRect();
          if (t.clientX >= rect.left && t.clientX <= rect.right &&
              t.clientY >= rect.top && t.clientY <= rect.bottom) {
            activeTouchId = t.identifier;
            this.touchMove.active = true;
            this.touchMove.startX = rect.left + rect.width / 2;
            this.touchMove.startY = rect.top + rect.height / 2;
            updateStick(t.clientX, t.clientY);
            break;
          }
        }
      };

      const handleTouchMove = (e) => {
        if (!this.touchMove.active) return;
        for (let i = 0; i < e.changedTouches.length; i++) {
          const t = e.changedTouches[i];
          if (t.identifier === activeTouchId) {
            updateStick(t.clientX, t.clientY);
            break;
          }
        }
      };

      const handleTouchEnd = (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (e.changedTouches[i].identifier === activeTouchId) {
            this.touchMove.active = false;
            this.touchMove.dx = 0;
            this.touchMove.dy = 0;
            joystickStick.style.transform = `translate(0px, 0px)`;
            activeTouchId = null;
            break;
          }
        }
      };

      const updateStick = (clientX, clientY) => {
        let dx = clientX - this.touchMove.startX;
        let dy = clientY - this.touchMove.startY;
        const dist = Math.hypot(dx, dy);
        if (dist > maxDist) {
          dx = (dx / dist) * maxDist;
          dy = (dy / dist) * maxDist;
        }
        joystickStick.style.transform = `translate(${dx}px, ${dy}px)`;
        this.touchMove.dx = dx / maxDist;
        this.touchMove.dy = dy / maxDist;
      };

      window.addEventListener('touchstart', handleTouchStart, { passive: false });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd, { passive: false });
      window.addEventListener('touchcancel', handleTouchEnd, { passive: false });

      // Mobile Fire Button
      if (btnFire) {
        const fireStart = (e) => {
          e.preventDefault();
          this.isFiringTouch = true;
          btnFire.classList.add('firing');
          window.soundManager.resume();
        };
        const fireEnd = (e) => {
          e.preventDefault();
          this.isFiringTouch = false;
          btnFire.classList.remove('firing');
        };
        btnFire.addEventListener('touchstart', fireStart, { passive: false });
        btnFire.addEventListener('touchend', fireEnd, { passive: false });
        btnFire.addEventListener('touchcancel', fireEnd, { passive: false });
        btnFire.addEventListener('mousedown', fireStart);
        btnFire.addEventListener('mouseup', fireEnd);
      }

      // Mobile Ability Button
      const btnAbility = document.getElementById('btnMobileAbility');
      if (btnAbility) {
        btnAbility.addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.triggerPlayerAbility();
        }, { passive: false });
        btnAbility.addEventListener('click', () => this.triggerPlayerAbility());
      }

      // HUD Ability Box Clickable
      const abilityBox = document.getElementById('abilityIndicator');
      if (abilityBox) {
        abilityBox.addEventListener('click', () => this.triggerPlayerAbility());
      }

      // Mobile Dash Button
      if (btnDash) {
        btnDash.addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.triggerPlayerDash();
        }, { passive: false });
        btnDash.addEventListener('click', () => this.triggerPlayerDash());
      }

      // Mobile Reload Button
      if (btnReload) {
        btnReload.addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.triggerPlayerReload();
        }, { passive: false });
        btnReload.addEventListener('click', () => this.triggerPlayerReload());
      }

      // Auto Aim Toggle Button
      if (btnAutoAim) {
        btnAutoAim.addEventListener('click', () => {
          this.settings.autoAim = !this.settings.autoAim;
          const text = document.getElementById('autoAimText');
          if (text) text.innerText = `AIM: ${this.settings.autoAim ? 'AUTO' : 'MANUAL'}`;
        });
      }
    }

    // ===================== RESIZE & CAMERA =====================
    resize() {
      const container = document.getElementById('gameContainer');
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;

      // Handle High-DPI for razor-sharp canvas
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = w * dpr;
      this.canvas.height = h * dpr;
      this.screenWidth = w;
      this.screenHeight = h;
      this.dpr = dpr;

      // Auto-scale camera so arena fits appropriately on small & large screens
      const scaleX = w / 1100;
      const scaleY = h / 720;
      this.camera.scale = Math.min(Math.max(Math.min(scaleX, scaleY), 0.65), 1.15);
    }

    // ===================== GAME ACTIONS =====================
    getPlayer() {
      return this.players.find(p => p.id === this.controlledCharId) || this.players[0];
    }

    triggerPlayerDash() {
      const player = this.getPlayer();
      if (!player || player.isDead || player.dashCooldownTimer > 0 || player.isDashing) return;

      player.isDashing = true;
      player.dashTimer = player.dashDuration;
      player.dashCooldownTimer = player.dashCooldown;

      // Dash in movement direction or facing direction
      let dirX = player.vx;
      let dirY = player.vy;
      const speed = Math.hypot(dirX, dirY);

      if (speed > 10) {
        player.dashVx = (dirX / speed) * player.dashSpeed;
        player.dashVy = (dirY / speed) * player.dashSpeed;
      } else {
        player.dashVx = Math.cos(player.aimAngle) * player.dashSpeed;
        player.dashVy = Math.sin(player.aimAngle) * player.dashSpeed;
      }

      window.soundManager.playDash();
      this.createDashGhost(player);
    }

    triggerPlayerReload() {
      const player = this.getPlayer();
      if (!player || player.isDead || player.isReloading || player.ammo >= player.clipSize) return;

      player.isReloading = true;
      player.reloadProgress = 0;
      window.soundManager.playReload();
    }

    triggerPlayerAbility() {
      const player = this.getPlayer();
      if (!player || player.isDead || player.abilityCooldownTimer > 0) return;
      this.executeAbility(player);
      this.updatePlayerHud();
    }

    executeAbility(character) {
      if (!character || character.isDead || character.abilityCooldownTimer > 0) return;

      switch (character.id) {
        case 'suganeesh': {
          // 1. Suganeesh - "Blaze" Fire Burst (10s CD)
          character.abilityCooldownTimer = character.abilityCooldown || 10;
          window.soundManager.playFireBurst();
          this.triggerScreenShake(0.3, 10);
          this.createExplosionParticles(character.x, character.y, 35);
          this.createFloatingText('FIRE BURST! 🔥', character.x, character.y - 25, '#ff3d00', true);

          // Expanding fire shockwave particle
          this.particles.push({
            x: character.x, y: character.y,
            isFireRing: true,
            currentRadius: 15,
            targetRadius: 180,
            color: '#ff3d00',
            alpha: 1,
            decay: 3.2
          });

          // AOE Damage to all nearby opponents
          const burstRadius = 180;
          const burstDamage = 45;
          this.players.forEach(p => {
            if (p.isDead || p.team === character.team) return;
            const dist = Math.hypot(p.x - character.x, p.y - character.y);
            if (dist < burstRadius + p.radius) {
              const angle = Math.atan2(p.y - character.y, p.x - character.x);
              p.x += Math.cos(angle) * 40;
              p.y += Math.sin(angle) * 40;
              this.handlePlayerDamage(p, burstDamage, character.id, 'fire_burst');
            }
          });
          break;
        }

        case 'karthikeyan': {
          // 2. Karthikeyan - "Tank" Shield Wall (12s CD)
          character.abilityCooldownTimer = character.abilityCooldown || 12;
          character.shieldActiveTimer = 4.5; // Absorbs 75% damage for 4.5 seconds
          window.soundManager.playShield();
          this.createSparks(character.x, character.y, '#ffd600', 16);
          this.createFloatingText('SHIELD WALL! 🛡️', character.x, character.y - 30, '#ffd600', true);
          break;
        }

        case 'jaswanth': {
          // 3. Jaswanth - "Dash" Quick Dash (8s CD)
          character.abilityCooldownTimer = character.abilityCooldown || 8;
          character.isDashing = true;
          character.isInvulnerableDash = true;
          character.dashTimer = 0.28;
          const speed = 720;
          character.dashVx = Math.cos(character.aimAngle) * speed;
          character.dashVy = Math.sin(character.aimAngle) * speed;
          window.soundManager.playDash();
          this.createFloatingText('QUICK DASH! ⚡', character.x, character.y - 25, '#80d8ff', true);
          for (let i = 0; i < 12; i++) {
            this.createDashGhost(character);
          }
          break;
        }

        case 'sudharsan': {
          // 4. Sudharsan - "Medic" Heal (15s CD)
          character.abilityCooldownTimer = character.abilityCooldown || 15;
          window.soundManager.playHeal();

          // Self Heal
          const selfHeal = Math.min(40, character.maxHp - character.hp);
          character.hp += selfHeal;
          this.createFloatingText(`+${selfHeal} HP 💚`, character.x, character.y - 25, '#00e676', true);

          // Team AOE Heal
          const healRadius = 260;
          this.players.forEach(p => {
            if (p.isDead || p.team !== character.team || p.id === character.id) return;
            const dist = Math.hypot(p.x - character.x, p.y - character.y);
            if (dist < healRadius) {
              const teamHeal = Math.min(35, p.maxHp - p.hp);
              p.hp += teamHeal;
              this.createFloatingText(`+${teamHeal} HP 💚`, p.x, p.y - 25, '#00e676', true);
            }
          });

          // Green healing biocell aura
          this.particles.push({
            x: character.x, y: character.y,
            isHealAura: true,
            currentRadius: 15,
            targetRadius: healRadius,
            color: '#00e676',
            alpha: 1,
            decay: 2.8
          });
          this.updateRosterHud();
          break;
        }

        case 'sakin': {
          // 5. Sakin - "Shadow" Stealth (14s CD)
          character.abilityCooldownTimer = character.abilityCooldown || 14;
          character.stealthActiveTimer = 5.0; // 5 seconds of stealth
          window.soundManager.playStealth();
          this.createFloatingText('STEALTH CLOAK! 👤', character.x, character.y - 25, '#cfd8dc', true);
          for (let i = 0; i < 18; i++) {
            const ang = Math.random() * Math.PI * 2;
            this.particles.push({
              x: character.x, y: character.y,
              vx: Math.cos(ang) * 45, vy: Math.sin(ang) * 45,
              radius: 4, color: '#455a64', alpha: 0.8, decay: 2.0
            });
          }
          break;
        }

        case 'sriram': {
          // 6. Sriram - "Sniper" Precision Shot (12s CD)
          character.abilityCooldownTimer = character.abilityCooldown || 12;
          window.soundManager.playPrecisionShot();
          this.triggerScreenShake(0.35, 12);

          // Massive recoil kickback
          character.vx -= Math.cos(character.aimAngle) * 110;
          character.vy -= Math.sin(character.aimAngle) * 110;

          this.createFloatingText('PRECISION SHOT! 🎯', character.x, character.y - 25, '#ff1744', true);

          // Piercing railgun beam
          const angle = character.aimAngle;
          const speed = 1500;
          const damage = 80;

          this.bullets.push({
            shooterId: character.id,
            team: character.team,
            weaponType: 'precision_rail',
            x: character.x + Math.cos(angle) * (character.radius + 18),
            y: character.y + Math.sin(angle) * (character.radius + 18),
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: 6.5,
            color: '#ff1744',
            damage: damage,
            isPiercing: true,
            piercedTargets: [],
            lifeTime: 1.2,
            trail: []
          });
          break;
        }
      }
    }

    // ===================== SHOOTING MECHANICS =====================
    fireWeapon(shooter, targetAngle) {
      if (shooter.isDead || shooter.fireCooldown > 0) return;

      if (shooter.isReloading) return;

      if (shooter.ammo <= 0) {
        if (!shooter.isReloading) {
          shooter.isReloading = true;
          shooter.reloadProgress = 0;
          if (shooter.isPlayer) window.soundManager.playReload();
        }
        return;
      }

      shooter.ammo--;
      shooter.fireCooldown = shooter.fireRate;
      shooter.shotsFired++;

      // Recoil kickback on velocity
      shooter.vx -= Math.cos(targetAngle) * 35;
      shooter.vy -= Math.sin(targetAngle) * 35;

      // Muzzle flash particle
      this.createMuzzleFlash(shooter, targetAngle);

      // Play Sound
      window.soundManager.playShoot(shooter.weaponType);

      // Spawn Bullets
      if (shooter.weaponType === 'shotgun') {
        const pellets = shooter.pelletCount || 6;
        for (let i = 0; i < pellets; i++) {
          const spreadOffset = (Math.random() - 0.5) * shooter.spread;
          const angle = targetAngle + spreadOffset;
          const speedVariance = shooter.bulletSpeed * (0.9 + Math.random() * 0.2);
          this.spawnBullet(shooter, angle, speedVariance, shooter.damage);
        }
      } else if (shooter.weaponType === 'pistols') {
        // Alternating dual muzzle offset
        const sideOffset = (shooter.shotsFired % 2 === 0 ? 1 : -1) * 7;
        const angle = targetAngle + (Math.random() - 0.5) * shooter.spread;
        this.spawnBullet(shooter, angle, shooter.bulletSpeed, shooter.damage, sideOffset);
      } else {
        const spreadOffset = (Math.random() - 0.5) * shooter.spread;
        const angle = targetAngle + spreadOffset;
        this.spawnBullet(shooter, angle, shooter.bulletSpeed, shooter.damage);
      }

      if (shooter.isPlayer) {
        this.updatePlayerHud();
      }
    }

    spawnBullet(shooter, angle, speed, damage, perpOffset = 0) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const spawnDist = shooter.radius + 10;

      const perpX = -sin * perpOffset;
      const perpY = cos * perpOffset;

      this.bullets.push({
        shooterId: shooter.id,
        team: shooter.team,
        weaponType: shooter.weaponType,
        x: shooter.x + cos * spawnDist + perpX,
        y: shooter.y + sin * spawnDist + perpY,
        vx: cos * speed,
        vy: sin * speed,
        radius: shooter.bulletRadius || 3.5,
        color: shooter.bulletColor || '#fff',
        damage: damage,
        splashRadius: shooter.splashRadius || 0,
        splashDamage: shooter.splashDamage || 0,
        lifeTime: 2.5,
        trail: []
      });
    }

    // ===================== UPDATE LOOP =====================
    loop(timestamp) {
      const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05); // cap delta
      this.lastTime = timestamp;

      if (!this.isPaused && !this.isGameOver) {
        this.update(dt);
      }

      this.render();
      requestAnimationFrame(this.loop.bind(this));
    }

    update(dt) {
      // Round Timer
      this.matchTimer -= dt;
      if (this.matchTimer <= 0) {
        this.matchTimer = 0;
        this.handleTimeOut();
      }
      this.updateTimerDisplay();

      // Screen Shake Decay
      if (this.shakeDuration > 0) {
        this.shakeDuration -= dt;
      }

      // Update Health Packs Respawn
      this.healthPacks.forEach(pack => {
        if (!pack.active) {
          pack.respawnTimer += dt;
          if (pack.respawnTimer >= pack.maxRespawn) {
            pack.active = true;
            pack.respawnTimer = 0;
          }
        }
      });

      // Update Players
      this.players.forEach(p => {
        if (p.isDead) return;

        // Damage flash decay
        if (p.damageFlash > 0) p.damageFlash -= dt * 4;

        // Fire Cooldown
        if (p.fireCooldown > 0) p.fireCooldown -= dt;

        // Dash Cooldown
        if (p.dashCooldownTimer > 0) p.dashCooldownTimer -= dt;

        // Ability Cooldown & Active Timers
        if (p.abilityCooldownTimer > 0) p.abilityCooldownTimer -= dt;
        if (p.shieldActiveTimer > 0) p.shieldActiveTimer -= dt;
        if (p.stealthActiveTimer > 0) p.stealthActiveTimer -= dt;

        // Reload Logic
        if (p.isReloading) {
          p.reloadProgress += dt;
          if (p.reloadProgress >= p.reloadTime) {
            p.ammo = p.clipSize;
            p.isReloading = false;
            p.reloadProgress = 0;
            if (p.isPlayer) this.updatePlayerHud();
          }
        }

        // Dashing State
        if (p.isDashing) {
          p.dashTimer -= dt;
          p.x += p.dashVx * dt;
          p.y += p.dashVy * dt;
          this.handleObstacleCollisions(p);

          if (Math.random() < 0.4) this.createDashGhost(p);

          if (p.dashTimer <= 0) {
            p.isDashing = false;
            p.isInvulnerableDash = false;
          }
        } else {
          // Standard Movement Logic
          if (p.isPlayer) {
            this.updatePlayerMovement(p, dt);
          } else {
            this.updateBotAI(p, dt);
          }
        }

        // Clamp inside arena boundaries
        p.x = Math.max(p.radius + 32, Math.min(WORLD_WIDTH - p.radius - 32, p.x));
        p.y = Math.max(p.radius + 32, Math.min(WORLD_HEIGHT - p.radius - 32, p.y));

        // Health Pack Pickup check
        this.healthPacks.forEach(pack => {
          if (pack.active && p.hp < p.maxHp) {
            const dist = Math.hypot(p.x - pack.x, p.y - pack.y);
            if (dist < p.radius + pack.radius) {
              pack.active = false;
              pack.respawnTimer = 0;
              const heal = Math.min(30, p.maxHp - p.hp);
              p.hp += heal;
              this.createFloatingText(`+${heal} HP`, p.x, p.y - 25, '#00e676');
              window.soundManager.playHeal();
              this.updateRosterHud();
              if (p.isPlayer) this.updatePlayerHud();
            }
          }
        });
      });

      // Real-time HUD Cooldown & Status update
      this.updatePlayerHud();

      // Update Bullets
      this.updateBullets(dt);

      // Update Particles
      this.updateParticles(dt);

      // Update Floating Numbers
      this.updateFloatingTexts(dt);

      // Center Camera on Controlled Player
      this.updateCamera(dt);

      // Check Team Elimination Condition
      this.checkWinCondition();
    }

    // ===================== PLAYER MOVEMENT & AIMING =====================
    updatePlayerMovement(player, dt) {
      let moveX = 0;
      let moveY = 0;

      // Keyboard WASD / Arrows
      if (this.keys['w'] || this.keys['arrowup']) moveY -= 1;
      if (this.keys['s'] || this.keys['arrowdown']) moveY += 1;
      if (this.keys['a'] || this.keys['arrowleft']) moveX -= 1;
      if (this.keys['d'] || this.keys['arrowright']) moveX += 1;

      // Virtual Joystick Input
      if (this.touchMove.active) {
        moveX = this.touchMove.dx;
        moveY = this.touchMove.dy;
      }

      // Normalize speed
      const len = Math.hypot(moveX, moveY);
      if (len > 0.1) {
        const factor = len > 1 ? 1 / len : 1;
        player.vx = moveX * factor * player.speed;
        player.vy = moveY * factor * player.speed;
      } else {
        player.vx *= 0.65;
        player.vy *= 0.65;
      }

      player.x += player.vx * dt;
      player.y += player.vy * dt;
      this.handleObstacleCollisions(player);

      // Aim Calculation
      // 1. Convert screen mouse to world coordinates
      const worldMouseX = (this.mouse.x * this.dpr - this.canvas.width / 2) / this.camera.scale + this.camera.x;
      const worldMouseY = (this.mouse.y * this.dpr - this.canvas.height / 2) / this.camera.scale + this.camera.y;

      let targetAimAngle = Math.atan2(worldMouseY - player.y, worldMouseX - player.x);

      // If Auto-Aim is enabled and mobile or requested, lock onto closest alive enemy
      if (this.settings.autoAim) {
        const closestEnemy = this.findClosestVisibleEnemy(player);
        if (closestEnemy) {
          targetAimAngle = Math.atan2(closestEnemy.y - player.y, closestEnemy.x - player.x);
        }
      }

      player.aimAngle = targetAimAngle;

      // Shooting Trigger
      if (this.mouse.isDown || this.isFiringTouch) {
        this.fireWeapon(player, player.aimAngle);
      }
    }

    // ===================== BOT AI LOGIC =====================
    updateBotAI(bot, dt) {
      bot.aiDecisionTimer -= dt;
      bot.aiStrafeTimer -= dt;

      // Find primary target (closest alive opponent)
      const enemies = this.players.filter(p => !p.isDead && p.team !== bot.team);
      if (enemies.length === 0) return;

      let target = bot.aiTarget;
      if (!target || target.isDead || bot.aiDecisionTimer <= 0) {
        bot.aiTarget = this.findBestTargetForBot(bot, enemies);
        target = bot.aiTarget;
        bot.aiDecisionTimer = 0.4 + Math.random() * 0.4;
      }

      if (bot.aiStrafeTimer <= 0) {
        bot.aiStrafeDir = -bot.aiStrafeDir;
        bot.aiStrafeTimer = 1.0 + Math.random() * 1.5;
      }

      if (!target) return;

      const dx = target.x - bot.x;
      const dy = target.y - bot.y;
      const dist = Math.hypot(dx, dy);
      const angleToTarget = Math.atan2(dy, dx);

      // Smooth aim rotation towards target
      bot.aimAngle = angleToTarget;

      // Tactical Behavior based on Weapon & Role
      let idealMinDist = 200;
      let idealMaxDist = 450;
      if (bot.weaponType === 'shotgun') {
        idealMinDist = 70;
        idealMaxDist = 180;
      } else if (bot.weaponType === 'sniper') {
        idealMinDist = 380;
        idealMaxDist = 650;
      } else if (bot.weaponType === 'pistols') {
        idealMinDist = 140;
        idealMaxDist = 300;
      }

      // Check if low health -> seek health pack
      let moveTargetX = target.x;
      let moveTargetY = target.y;

      if (bot.hp < 40) {
        const activePack = this.healthPacks.find(p => p.active);
        if (activePack) {
          moveTargetX = activePack.x;
          moveTargetY = activePack.y;
        }
      }

      let moveAngle = Math.atan2(moveTargetY - bot.y, moveTargetX - bot.x);

      // If at good combat range, circle strafe and use cover
      if (dist < idealMinDist) {
        // Back up
        moveAngle += Math.PI;
      } else if (dist <= idealMaxDist) {
        // Orbit around target
        moveAngle += (Math.PI / 2) * bot.aiStrafeDir;
      }

      bot.vx = Math.cos(moveAngle) * bot.speed;
      bot.vy = Math.sin(moveAngle) * bot.speed;

      // Obstacle avoidance steer
      this.avoidObstaclesForBot(bot);

      bot.x += bot.vx * dt;
      bot.y += bot.vy * dt;
      this.handleObstacleCollisions(bot);

      // AI Line of sight check before firing
      if (this.hasLineOfSight(bot.x, bot.y, target.x, target.y)) {
        // Fire if within range
        if (dist <= (bot.weaponType === 'sniper' ? 800 : 500)) {
          // Slight inaccuracy based on bot skill
          const aimError = (Math.random() - 0.5) * 0.08;
          this.fireWeapon(bot, bot.aimAngle + aimError);
        }
      }

      // Tactical Ability Usage for Bots
      if (bot.abilityCooldownTimer <= 0) {
        if (bot.id === 'suganeesh') {
          // Suganeesh: Fire Burst if any enemy is within 160px
          const nearEnemy = enemies.find(e => Math.hypot(e.x - bot.x, e.y - bot.y) < 160);
          if (nearEnemy) this.executeAbility(bot);
        } else if (bot.id === 'karthikeyan') {
          // Karthikeyan: Shield Wall if under attack or hp < 70
          if (bot.hp < 70 || bot.damageFlash > 0.4) this.executeAbility(bot);
        } else if (bot.id === 'jaswanth') {
          // Jaswanth: Quick Dash if enemy is dangerously close or hp < 50
          if (dist < 180 || bot.hp < 50) this.executeAbility(bot);
        } else if (bot.id === 'sudharsan') {
          // Sudharsan: Heal if self or teammates low on HP
          const allies = this.players.filter(p => !p.isDead && p.team === bot.team);
          if (allies.some(a => a.hp < 65)) this.executeAbility(bot);
        } else if (bot.id === 'sakin') {
          // Sakin: Stealth when engaging or wounded
          if (bot.hp < 60 || dist < 280) this.executeAbility(bot);
        } else if (bot.id === 'sriram') {
          // Sriram: Precision Shot when having clear line of sight
          if (dist > 180 && this.hasLineOfSight(bot.x, bot.y, target.x, target.y)) {
            this.executeAbility(bot);
          }
        }
      }

      // AI Dash to evade when taking heavy damage
      if (bot.hp < 50 && bot.dashCooldownTimer <= 0 && Math.random() < 0.05) {
        bot.isDashing = true;
        bot.dashTimer = bot.dashDuration;
        bot.dashCooldownTimer = bot.dashCooldown;
        bot.dashVx = Math.cos(moveAngle) * bot.dashSpeed;
        bot.dashVy = Math.sin(moveAngle) * bot.dashSpeed;
      }
    }

    findBestTargetForBot(bot, enemies) {
      let best = null;
      let minDist = Infinity;

      enemies.forEach(e => {
        // Sakin stealth cloaking makes bots unable to target him easily
        if (e.stealthActiveTimer > 0 && Math.random() < 0.85) return;

        const d = Math.hypot(e.x - bot.x, e.y - bot.y);
        // Prioritize wounded targets or human player
        const weight = (e.isPlayer ? 0.8 : 1.0) * (e.hp / 100);
        const score = d * weight;
        if (score < minDist) {
          minDist = score;
          best = e;
        }
      });
      return best;
    }

    findClosestVisibleEnemy(fromPlayer) {
      const enemies = this.players.filter(p => !p.isDead && p.team !== fromPlayer.team);
      let closest = null;
      let minDist = 700;

      enemies.forEach(e => {
        if (e.stealthActiveTimer > 0) return; // Sakin in stealth cannot be auto-aim locked!

        const d = Math.hypot(e.x - fromPlayer.x, e.y - fromPlayer.y);
        if (d < minDist && this.hasLineOfSight(fromPlayer.x, fromPlayer.y, e.x, e.y)) {
          minDist = d;
          closest = e;
        }
      });
      return closest;
    }

    hasLineOfSight(x1, y1, x2, y2) {
      for (let o of this.obstacles) {
        if (o.type === 'wall' || (o.type === 'crate' && o.hp > 0)) {
          if (this.lineIntersectsRect(x1, y1, x2, y2, o.x, o.y, o.w, o.h)) {
            return false;
          }
        }
      }
      return true;
    }

    lineIntersectsRect(x1, y1, x2, y2, rx, ry, rw, rh) {
      // Check 4 segments of rectangle
      return this.lineIntersectsLine(x1, y1, x2, y2, rx, ry, rx + rw, ry) ||
             this.lineIntersectsLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh) ||
             this.lineIntersectsLine(x1, y1, x2, y2, rx + rw, ry + rh, rx, ry + rh) ||
             this.lineIntersectsLine(x1, y1, x2, y2, rx, ry + rh, rx, ry);
    }

    lineIntersectsLine(x1, y1, x2, y2, x3, y3, x4, y4) {
      const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
      if (denom === 0) return false;
      const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
      const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
      return (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1);
    }

    avoidObstaclesForBot(bot) {
      const lookAhead = 40;
      const nextX = bot.x + (bot.vx / bot.speed) * lookAhead;
      const nextY = bot.y + (bot.vy / bot.speed) * lookAhead;

      for (let o of this.obstacles) {
        if (o.type === 'wall' || o.type === 'crate') {
          if (nextX >= o.x - 20 && nextX <= o.x + o.w + 20 &&
              nextY >= o.y - 20 && nextY <= o.y + o.h + 20) {
            // Push velocity vector perpendicular to wall
            bot.vx = -bot.vy;
            bot.vy = bot.vx;
            break;
          }
        }
      }
    }

    // ===================== COLLISION HANDLING =====================
    handleObstacleCollisions(entity) {
      this.obstacles.forEach(o => {
        if (o.type === 'wall' || (o.type === 'crate' && o.hp > 0)) {
          // Circle vs AABB Rect
          const closestX = Math.max(o.x, Math.min(entity.x, o.x + o.w));
          const closestY = Math.max(o.y, Math.min(entity.y, o.y + o.h));
          const distX = entity.x - closestX;
          const distY = entity.y - closestY;
          const dist = Math.hypot(distX, distY);

          if (dist < entity.radius) {
            const overlap = entity.radius - dist;
            if (dist > 0.001) {
              entity.x += (distX / dist) * overlap;
              entity.y += (distY / dist) * overlap;
            } else {
              entity.x += entity.radius;
            }
          }
        } else if (o.type === 'barrel' && o.hp > 0) {
          // Circle vs Circle
          const dx = entity.x - o.x;
          const dy = entity.y - o.y;
          const dist = Math.hypot(dx, dy);
          const minDist = entity.radius + o.radius;
          if (dist < minDist && dist > 0.001) {
            const overlap = minDist - dist;
            entity.x += (dx / dist) * overlap;
            entity.y += (dy / dist) * overlap;
          }
        }
      });
    }

    // ===================== BULLETS & HIT RESOLUTION =====================
    updateBullets(dt) {
      for (let i = this.bullets.length - 1; i >= 0; i--) {
        const b = this.bullets[i];
        b.lifeTime -= dt;

        // Trail points
        b.trail.push({ x: b.x, y: b.y, alpha: 1 });
        if (b.trail.length > 5) b.trail.shift();

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        if (b.lifeTime <= 0) {
          this.bullets.splice(i, 1);
          continue;
        }

        let bulletRemoved = false;

        // 1. Collision with Obstacles
        for (let o of this.obstacles) {
          if (o.type === 'wall') {
            if (b.x >= o.x && b.x <= o.x + o.w && b.y >= o.y && b.y <= o.y + o.h) {
              this.createSparks(b.x, b.y, b.color, 6);
              this.bullets.splice(i, 1);
              bulletRemoved = true;
              break;
            }
          } else if (o.type === 'crate' && o.hp > 0) {
            if (b.x >= o.x && b.x <= o.x + o.w && b.y >= o.y && b.y <= o.y + o.h) {
              o.hp -= b.damage;
              this.createWoodSplinters(b.x, b.y, 8);
              if (o.hp <= 0) {
                this.createWoodSplinters(o.x + o.w / 2, o.y + o.h / 2, 25);
                window.soundManager.playHit(true);
              }
              this.bullets.splice(i, 1);
              bulletRemoved = true;
              break;
            }
          } else if (o.type === 'barrel' && o.hp > 0) {
            const d = Math.hypot(b.x - o.x, b.y - o.y);
            if (d < b.radius + o.radius) {
              o.hp -= b.damage;
              this.createSparks(b.x, b.y, '#ff3d00', 8);
              if (o.hp <= 0) {
                this.triggerBarrelExplosion(o, b.shooterId);
              }
              this.bullets.splice(i, 1);
              bulletRemoved = true;
              break;
            }
          }
        }

        if (bulletRemoved) continue;

        // 2. Collision with Players
        for (let p of this.players) {
          if (p.isDead || p.team === b.team) continue;

          const dist = Math.hypot(b.x - p.x, b.y - p.y);
          if (dist < b.radius + p.radius) {
            if (b.isPiercing) {
              if (!b.piercedTargets.includes(p.id)) {
                b.piercedTargets.push(p.id);
                this.handlePlayerDamage(p, b.damage, b.shooterId, b.weaponType);
                this.createSparks(b.x, b.y, '#ff1744', 12);
              }
            } else {
              this.handlePlayerDamage(p, b.damage, b.shooterId, b.weaponType);

              // Plasma splash AOE damage
              if (b.splashRadius > 0) {
                this.createPlasmaShockwave(b.x, b.y, b.splashRadius);
                this.players.forEach(nearby => {
                  if (!nearby.isDead && nearby.id !== p.id && nearby.team !== b.team) {
                    const splashDist = Math.hypot(b.x - nearby.x, b.y - nearby.y);
                    if (splashDist < b.splashRadius + nearby.radius) {
                      this.handlePlayerDamage(nearby, b.splashDamage, b.shooterId, 'plasma');
                    }
                  }
                });
              }

              this.bullets.splice(i, 1);
              break;
            }
          }
        }
      }
    }

    triggerBarrelExplosion(barrel, triggerShooterId) {
      window.soundManager.playExplosion();
      this.triggerScreenShake(0.35, 14);
      this.createExplosionParticles(barrel.x, barrel.y, 40);

      const explosionRadius = 140;
      const maxDamage = 65;

      this.players.forEach(p => {
        if (p.isDead) return;
        const d = Math.hypot(p.x - barrel.x, p.y - barrel.y);
        if (d < explosionRadius + p.radius) {
          const dmg = Math.round(maxDamage * (1 - d / (explosionRadius + p.radius)));
          this.handlePlayerDamage(p, Math.max(15, dmg), triggerShooterId, 'explosion');
        }
      });
    }

    handlePlayerDamage(target, damage, attackerId, weaponType) {
      if (target.isDead) return;

      // 1. Jaswanth "Dash" invulnerability
      if (target.isInvulnerableDash) {
        this.createFloatingText('EVADED! ⚡', target.x, target.y - 20, '#80d8ff', true);
        return;
      }

      // 2. Karthikeyan "Tank" Shield Wall (75% damage reduction)
      if (target.shieldActiveTimer > 0) {
        damage = Math.max(1, Math.round(damage * 0.25));
        this.createSparks(target.x, target.y, '#ffd600', 8);
        this.createFloatingText('SHIELD -75%! 🛡️', target.x, target.y - 32, '#ffd600', true);
      }

      // 3. Sakin "Shadow" Stealth drops partially upon receiving damage
      if (target.stealthActiveTimer > 0) {
        target.stealthActiveTimer = Math.max(0, target.stealthActiveTimer - 1.5);
      }

      target.hp -= damage;
      target.damageFlash = 1.0;

      // Track attacker stats
      const attacker = this.players.find(p => p.id === attackerId);
      if (attacker) {
        attacker.damageDealt += damage;
        attacker.shotsHit++;
      }

      const isCrit = damage >= 30;
      window.soundManager.playHit(isCrit);

      // Blood/Sparks and floating text
      this.createHitImpact(target.x, target.y, isCrit ? '#ff1744' : '#00e5ff', isCrit ? 16 : 8);
      this.createFloatingText(`-${damage}`, target.x, target.y - 20, isCrit ? '#ff1744' : '#ffffff', isCrit);

      if (target.isPlayer) {
        this.triggerScreenShake(0.18, isCrit ? 8 : 4);
      }

      this.updateRosterHud();
      if (target.isPlayer) {
        this.updatePlayerHud();
      }

      // Check Elimination
      if (target.hp <= 0) {
        target.hp = 0;
        target.isDead = true;
        window.soundManager.playDeath();
        this.createDeathPuff(target.x, target.y, target.color);

        if (attacker) {
          attacker.kills++;
          this.addKillFeedEntry(attacker, target);
        } else {
          this.addKillFeedEntry({ name: 'Hazard', team: 'Neutral' }, target);
        }

        this.updateRosterHud();
        if (target.isPlayer) {
          this.updatePlayerHud();
        }
      }
    }

    // ===================== WIN / GAME OVER LOGIC =====================
    checkWinCondition() {
      const aliveA = this.players.filter(p => p.team === 'A' && !p.hp <= 0 && !p.isDead).length;
      const aliveB = this.players.filter(p => p.team === 'B' && !p.hp <= 0 && !p.isDead).length;

      if (aliveA === 0 || aliveB === 0) {
        this.isGameOver = true;
        const winnerTeam = aliveA > 0 ? 'A' : 'B';
        if (winnerTeam === 'A') this.scoreA++;
        else this.scoreB++;

        document.getElementById('scoreA').innerText = this.scoreA;
        document.getElementById('scoreB').innerText = this.scoreB;

        const player = this.getPlayer();
        const playerWon = player.team === winnerTeam;
        if (playerWon) window.soundManager.playVictory();
        else window.soundManager.playDefeat();

        setTimeout(() => this.showGameOverModal(winnerTeam), 800);
      }
    }

    handleTimeOut() {
      const aliveA = this.players.filter(p => p.team === 'A' && !p.isDead).length;
      const aliveB = this.players.filter(p => p.team === 'B' && !p.isDead).length;
      let winner = 'A';
      if (aliveB > aliveA) winner = 'B';
      else if (aliveA === aliveB) {
        // Tie breaker by total HP
        const hpA = this.players.filter(p => p.team === 'A').reduce((acc, p) => acc + p.hp, 0);
        const hpB = this.players.filter(p => p.team === 'B').reduce((acc, p) => acc + p.hp, 0);
        winner = hpA >= hpB ? 'A' : 'B';
      }

      this.isGameOver = true;
      if (winner === 'A') this.scoreA++;
      else this.scoreB++;

      document.getElementById('scoreA').innerText = this.scoreA;
      document.getElementById('scoreB').innerText = this.scoreB;

      this.showGameOverModal(winner);
    }

    // ===================== PARTICLE & VISUAL EFFECTS =====================
    createMuzzleFlash(shooter, angle) {
      const dist = shooter.radius + 14;
      const flashX = shooter.x + Math.cos(angle) * dist;
      const flashY = shooter.y + Math.sin(angle) * dist;

      for (let i = 0; i < 6; i++) {
        const spread = (Math.random() - 0.5) * 0.8;
        const speed = 120 + Math.random() * 140;
        this.particles.push({
          x: flashX, y: flashY,
          vx: Math.cos(angle + spread) * speed,
          vy: Math.sin(angle + spread) * speed,
          radius: 2.5 + Math.random() * 2,
          color: shooter.bulletColor || '#ffd54f',
          alpha: 1,
          decay: 14 + Math.random() * 8
        });
      }
    }

    createSparks(x, y, color, count) {
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 60 + Math.random() * 150;
        this.particles.push({
          x, y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          radius: 2,
          color: color || '#ffd600',
          alpha: 1,
          decay: 4 + Math.random() * 4
        });
      }
    }

    createHitImpact(x, y, color, count) {
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 70 + Math.random() * 180;
        this.particles.push({
          x, y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          radius: 2.5,
          color: color,
          alpha: 1,
          decay: 3.5 + Math.random() * 3
        });
      }
    }

    createExplosionParticles(x, y, count) {
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 50 + Math.random() * 320;
        const colors = ['#ff1744', '#ff9100', '#ffd600', '#ffffff', '#424242'];
        this.particles.push({
          x, y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          radius: 3 + Math.random() * 7,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 1.8 + Math.random() * 2.2
        });
      }
    }

    createPlasmaShockwave(x, y, radius) {
      this.particles.push({
        x, y,
        isShockwave: true,
        currentRadius: 5,
        targetRadius: radius,
        color: '#ff3d00',
        alpha: 1,
        decay: 3.0
      });
    }

    createWoodSplinters(x, y, count) {
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 40 + Math.random() * 130;
        this.particles.push({
          x, y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          radius: 2.5,
          color: '#8d6e63',
          alpha: 1,
          decay: 3.0
        });
      }
    }

    createDeathPuff(x, y, color) {
      for (let i = 0; i < 28; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 40 + Math.random() * 160;
        this.particles.push({
          x, y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          radius: 3.5 + Math.random() * 4,
          color: color,
          alpha: 1,
          decay: 1.6
        });
      }
    }

    createDashGhost(player) {
      this.particles.push({
        isGhost: true,
        x: player.x,
        y: player.y,
        radius: player.radius,
        color: player.accentColor,
        aimAngle: player.aimAngle,
        alpha: 0.55,
        decay: 3.5
      });
    }

    createFloatingText(text, x, y, color, isCrit = false) {
      this.floatTexts.push({
        text, x, y,
        color: color || '#fff',
        size: isCrit ? 18 : 13,
        alpha: 1,
        vy: -40,
        lifeTime: 0.8
      });
    }

    triggerScreenShake(duration, intensity) {
      this.shakeDuration = duration;
      this.shakeIntensity = intensity;
    }

    updateParticles(dt) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.alpha -= p.decay * dt;
        if (p.isShockwave || p.isFireRing || p.isHealAura) {
          p.currentRadius += (p.targetRadius - p.currentRadius) * (dt * 15);
        } else if (!p.isGhost) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vx *= 0.95;
          p.vy *= 0.95;
        }
        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
        }
      }
    }

    updateFloatingTexts(dt) {
      for (let i = this.floatTexts.length - 1; i >= 0; i--) {
        const ft = this.floatTexts[i];
        ft.lifeTime -= dt;
        ft.y += ft.vy * dt;
        ft.alpha = Math.max(0, ft.lifeTime / 0.8);
        if (ft.lifeTime <= 0) {
          this.floatTexts.splice(i, 1);
        }
      }
    }

    // ===================== CAMERA TRACKING =====================
    updateCamera(dt) {
      const player = this.getPlayer();
      if (!player) return;

      // Smooth lerp camera towards player position
      const targetX = player.x;
      const targetY = player.y;

      this.camera.x += (targetX - this.camera.x) * (dt * 7.5);
      this.camera.y += (targetY - this.camera.y) * (dt * 7.5);

      // Clamp camera so it doesn't show vast black space outside arena
      const halfW = (this.canvas.width / (2 * this.dpr)) / this.camera.scale;
      const halfH = (this.canvas.height / (2 * this.dpr)) / this.camera.scale;

      if (WORLD_WIDTH > halfW * 2) {
        this.camera.x = Math.max(halfW, Math.min(WORLD_WIDTH - halfW, this.camera.x));
      } else {
        this.camera.x = WORLD_WIDTH / 2;
      }

      if (WORLD_HEIGHT > halfH * 2) {
        this.camera.y = Math.max(halfH, Math.min(WORLD_HEIGHT - halfH, this.camera.y));
      } else {
        this.camera.y = WORLD_HEIGHT / 2;
      }
    }

    // ===================== RENDERING PIPELINE =====================
    render() {
      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;

      // Clear Canvas
      ctx.fillStyle = '#060910';
      ctx.fillRect(0, 0, w, h);

      ctx.save();

      // Screen Shake offset
      let shakeX = 0;
      let shakeY = 0;
      if (this.shakeDuration > 0) {
        shakeX = (Math.random() - 0.5) * this.shakeIntensity * this.dpr;
        shakeY = (Math.random() - 0.5) * this.shakeIntensity * this.dpr;
      }

      // Center viewport & apply camera
      ctx.translate(w / 2 + shakeX, h / 2 + shakeY);
      ctx.scale(this.camera.scale * this.dpr, this.camera.scale * this.dpr);
      ctx.translate(-this.camera.x, -this.camera.y);

      // 1. Draw Battlefield Floor & Cyber Grid
      this.drawBattlefield(ctx);

      // 2. Draw Health Powerup Stations
      this.drawHealthPacks(ctx);

      // 3. Draw Obstacles & Walls
      this.drawObstacles(ctx);

      // 4. Draw Dead Bodies / Graves
      this.drawDeadPlayers(ctx);

      // 5. Draw Particles (Ghosts, Splinters, Sparks)
      this.drawParticles(ctx);

      // 6. Draw Bullets with Glow
      this.drawBullets(ctx);

      // 7. Draw Active Players (Characters)
      this.drawAlivePlayers(ctx);

      // 8. Draw Floating Numbers
      this.drawFloatingTexts(ctx);

      ctx.restore();

      // 9. Draw Custom Laser Crosshair on screen
      this.drawCrosshair(ctx);
    }

    drawBattlefield(ctx) {
      // Dark high-tech arena base
      ctx.fillStyle = '#0b1120';
      ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

      // Cyber Grid
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 64;

      ctx.beginPath();
      for (let x = 0; x <= WORLD_WIDTH; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, WORLD_HEIGHT);
      }
      for (let y = 0; y <= WORLD_HEIGHT; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(WORLD_WIDTH, y);
      }
      ctx.stroke();

      // Team Spawn Bases
      // Team A Base (Cyan Left)
      ctx.fillStyle = 'rgba(0, 176, 255, 0.08)';
      ctx.fillRect(30, 30, 260, WORLD_HEIGHT - 60);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, 260, WORLD_HEIGHT - 60);

      // Team B Base (Orange Right)
      ctx.fillStyle = 'rgba(255, 61, 0, 0.08)';
      ctx.fillRect(WORLD_WIDTH - 290, 30, 260, WORLD_HEIGHT - 60);
      ctx.strokeStyle = 'rgba(255, 61, 0, 0.25)';
      ctx.lineWidth = 2;
      ctx.strokeRect(WORLD_WIDTH - 290, 30, 260, WORLD_HEIGHT - 60);

      // Center Arena Circle
      ctx.strokeStyle = 'rgba(255, 214, 0, 0.2)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, 180, 0, Math.PI * 2);
      ctx.stroke();
    }

    drawHealthPacks(ctx) {
      this.healthPacks.forEach(pack => {
        ctx.save();
        ctx.translate(pack.x, pack.y);

        // Outer Station Ring
        ctx.beginPath();
        ctx.arc(0, 0, pack.radius + 6, 0, Math.PI * 2);
        ctx.strokeStyle = pack.active ? '#00e676' : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 3;
        ctx.stroke();

        if (pack.active) {
          // Glowing Pulse Fill
          const glow = ctx.createRadialGradient(0, 0, 2, 0, 0, pack.radius);
          glow.addColorStop(0, 'rgba(0, 230, 118, 0.8)');
          glow.addColorStop(1, 'rgba(0, 230, 118, 0.15)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(0, 0, pack.radius, 0, Math.PI * 2);
          ctx.fill();

          // Medical Cross Symbol
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(-4, -12, 8, 24);
          ctx.fillRect(-12, -4, 24, 8);
        } else {
          // Cooldown ring
          const progress = pack.respawnTimer / pack.maxRespawn;
          ctx.beginPath();
          ctx.arc(0, 0, pack.radius, -Math.PI / 2, -Math.PI / 2 + progress * Math.PI * 2);
          ctx.strokeStyle = '#69f0ae';
          ctx.lineWidth = 4;
          ctx.stroke();
        }

        ctx.restore();
      });
    }

    drawObstacles(ctx) {
      this.obstacles.forEach(o => {
        if (o.type === 'wall') {
          // Concrete Bunker Wall with metallic chamfer & bevel
          ctx.fillStyle = '#17223b';
          ctx.fillRect(o.x, o.y, o.w, o.h);

          ctx.strokeStyle = '#2d4373';
          ctx.lineWidth = 3;
          ctx.strokeRect(o.x, o.y, o.w, o.h);

          // Top highlight line
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.fillRect(o.x, o.y, o.w, 4);
        } else if (o.type === 'crate' && o.hp > 0) {
          // Destructible Supply Crate
          ctx.fillStyle = '#5d4037';
          ctx.fillRect(o.x, o.y, o.w, o.h);

          ctx.strokeStyle = '#8d6e63';
          ctx.lineWidth = 2;
          ctx.strokeRect(o.x, o.y, o.w, o.h);

          // X brace pattern
          ctx.beginPath();
          ctx.moveTo(o.x, o.y);
          ctx.lineTo(o.x + o.w, o.y + o.h);
          ctx.moveTo(o.x + o.w, o.y);
          ctx.lineTo(o.x, o.y + o.h);
          ctx.stroke();

          // HP indicator if damaged
          if (o.hp < o.maxHp) {
            const pct = o.hp / o.maxHp;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(o.x + 4, o.y - 8, o.w - 8, 4);
            ctx.fillStyle = '#ffb300';
            ctx.fillRect(o.x + 4, o.y - 8, (o.w - 8) * pct, 4);
          }
        } else if (o.type === 'barrel' && o.hp > 0) {
          // Explosive Red Fuel Barrel
          ctx.save();
          ctx.translate(o.x, o.y);

          // Barrel Body
          ctx.beginPath();
          ctx.arc(0, 0, o.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#c62828';
          ctx.fill();

          ctx.strokeStyle = '#ff8a80';
          ctx.lineWidth = 3;
          ctx.stroke();

          // Hazard Radiation/Fire symbol
          ctx.fillStyle = '#ffd600';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('⚡', 0, 0);

          ctx.restore();
        }
      });
    }

    drawDeadPlayers(ctx) {
      this.players.forEach(p => {
        if (!p.isDead) return;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.globalAlpha = 0.45;

        // Downed silhouette
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#37474f';
        ctx.fill();
        ctx.strokeStyle = '#263238';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#b0bec5';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✖', 0, 0);

        ctx.restore();
      });
    }

    drawBullets(ctx) {
      this.bullets.forEach(b => {
        // Bullet Trail
        if (b.trail.length > 1) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(b.trail[0].x, b.trail[0].y);
          for (let i = 1; i < b.trail.length; i++) {
            ctx.lineTo(b.trail[i].x, b.trail[i].y);
          }
          ctx.strokeStyle = b.color;
          ctx.lineWidth = b.radius * 1.5;
          ctx.globalAlpha = 0.4;
          ctx.stroke();
          ctx.restore();
        }

        // Bullet Head with Glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      });
    }

    drawAlivePlayers(ctx) {
      this.players.forEach(p => {
        if (p.isDead) return;

        ctx.save();
        ctx.translate(p.x, p.y);

        // Stealth Cloak Transparency
        if (p.stealthActiveTimer > 0) {
          ctx.globalAlpha = p.isPlayer ? 0.5 : 0.22;
        }

        // Damage Flash overlay
        const isFlashing = p.damageFlash > 0.05;

        // Character Facing Direction Rotation
        ctx.save();
        ctx.rotate(p.aimAngle);

        // 1. Weapon Gun Barrel
        ctx.fillStyle = '#263238';
        ctx.strokeStyle = p.accentColor;
        ctx.lineWidth = 1.5;

        if (p.weaponType === 'shotgun') {
          // Double barrel
          ctx.fillRect(8, -6, 20, 5);
          ctx.fillRect(8, 1, 20, 5);
        } else if (p.weaponType === 'sniper') {
          // Long precision barrel
          ctx.fillRect(10, -2.5, 28, 5);
          ctx.strokeStyle = '#80d8ff';
          ctx.strokeRect(10, -2.5, 28, 5);
        } else if (p.weaponType === 'pistols') {
          // Dual side blasters
          ctx.fillRect(8, -10, 14, 4);
          ctx.fillRect(8, 6, 14, 4);
        } else if (p.weaponType === 'minigun') {
          // Triple vulcan barrel
          ctx.fillRect(8, -5, 22, 10);
        } else {
          // Assault rifle
          ctx.fillRect(8, -3, 20, 6);
        }

        // 2. Character Body Circle
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isFlashing ? '#ffffff' : p.color;
        ctx.fill();

        ctx.strokeStyle = p.team === 'A' ? '#00e5ff' : '#ff3d00';
        ctx.lineWidth = p.isPlayer ? 3.5 : 2.0;
        ctx.stroke();

        // 3. Tactical Visor / Eye direction indicator
        ctx.beginPath();
        ctx.arc(p.radius * 0.45, 0, 6, -Math.PI / 2, Math.PI / 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.restore(); // end rotation

        // 4. Karthikeyan Shield Wall (glowing rotating energy hexagon)
        if (p.shieldActiveTimer > 0) {
          ctx.save();
          ctx.rotate(performance.now() * 0.003);
          ctx.beginPath();
          const sides = 6;
          const rad = p.radius + 12;
          for (let s = 0; s < sides; s++) {
            const ang = (s / sides) * Math.PI * 2;
            const sx = Math.cos(ang) * rad;
            const sy = Math.sin(ang) * rad;
            if (s === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          ctx.closePath();
          ctx.strokeStyle = '#ffd600';
          ctx.lineWidth = 3;
          ctx.shadowColor = '#ffd600';
          ctx.shadowBlur = 12;
          ctx.stroke();
          ctx.fillStyle = 'rgba(255, 214, 0, 0.22)';
          ctx.fill();
          ctx.restore();
        }

        // 5. Player Halo Ring if human controlled
        if (p.isPlayer) {
          ctx.beginPath();
          ctx.arc(0, 0, p.radius + 6, 0, Math.PI * 2);
          ctx.strokeStyle = '#ffd600';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // 6. Overhead Name Tag & Codename Banner
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = p.isPlayer ? '#ffd600' : '#ffffff';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 4;
        ctx.fillText(`${p.name} [${p.title}]`, 0, -p.radius - 12);
        ctx.shadowBlur = 0;

        // 6. Overhead Health Bar
        const barW = 44;
        const barH = 5;
        const barY = -p.radius - 8;
        const hpPct = Math.max(0, p.hp / p.maxHp);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(-barW / 2, barY, barW, barH);

        let hpColor = '#00e676';
        if (hpPct < 0.35) hpColor = '#ff1744';
        else if (hpPct < 0.65) hpColor = '#ffd600';

        ctx.fillStyle = hpColor;
        ctx.fillRect(-barW / 2, barY, barW * hpPct, barH);

        // 7. Reload Ring (if reloading)
        if (p.isReloading) {
          const reloadPct = p.reloadProgress / p.reloadTime;
          ctx.beginPath();
          ctx.arc(0, 0, p.radius + 4, -Math.PI / 2, -Math.PI / 2 + reloadPct * Math.PI * 2);
          ctx.strokeStyle = '#ffd600';
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        ctx.restore();
      });
    }

    drawParticles(ctx) {
      this.particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.isGhost) {
          ctx.translate(p.x, p.y);
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        } else if (p.isFireRing) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.currentRadius, 0, Math.PI * 2);
          ctx.strokeStyle = '#ff3d00';
          ctx.lineWidth = 6;
          ctx.shadowColor = '#ff9100';
          ctx.shadowBlur = 18;
          ctx.stroke();
        } else if (p.isHealAura) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.currentRadius, 0, Math.PI * 2);
          ctx.strokeStyle = '#00e676';
          ctx.lineWidth = 5;
          ctx.shadowColor = '#69f0ae';
          ctx.shadowBlur = 16;
          ctx.stroke();
        } else if (p.isShockwave) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.currentRadius, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 4;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        ctx.restore();
      });
    }

    drawFloatingTexts(ctx) {
      this.floatTexts.forEach(ft => {
        ctx.save();
        ctx.globalAlpha = ft.alpha;
        ctx.font = `900 ${ft.size}px sans-serif`;
        ctx.fillStyle = ft.color;
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 5;
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      });
    }

    drawCrosshair(ctx) {
      // Draw crosshair at mouse location
      const mx = this.mouse.x * this.dpr;
      const my = this.mouse.y * this.dpr;

      ctx.save();
      ctx.translate(mx, my);

      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2;

      // Circle
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Cross ticks
      ctx.beginPath();
      ctx.moveTo(-16, 0); ctx.lineTo(-11, 0);
      ctx.moveTo(11, 0); ctx.lineTo(16, 0);
      ctx.moveTo(0, -16); ctx.lineTo(0, -11);
      ctx.moveTo(0, 11); ctx.lineTo(0, 16);
      ctx.stroke();

      // Center dot
      ctx.fillStyle = '#ff1744';
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // ===================== UI / HUD UPDATES =====================
    initDom() {
      // Top HUD Quick Actions
      const btnSound = document.getElementById('btnSoundToggle');
      const btnPause = document.getElementById('btnPause');
      const btnResume = document.getElementById('btnResume');
      const btnRestart = document.getElementById('btnRestart');
      const btnPlayAgain = document.getElementById('btnPlayAgain');
      const btnSwitchFighter = document.getElementById('btnSwitchFighter');

      if (btnSound) {
        btnSound.addEventListener('click', () => {
          const enabled = window.soundManager.toggle();
          btnSound.innerText = enabled ? '🔊' : '🔇';
          this.updateSettingsPills();
        });
      }

      if (btnPause) btnPause.addEventListener('click', () => this.togglePause());
      if (btnResume) btnResume.addEventListener('click', () => this.togglePause());
      if (btnRestart) btnRestart.addEventListener('click', () => this.startRound());
      if (btnPlayAgain) btnPlayAgain.addEventListener('click', () => this.startRound());

      if (btnSwitchFighter) {
        btnSwitchFighter.addEventListener('click', () => {
          document.getElementById('gameOverModal').classList.add('modal-hidden');
          document.getElementById('pauseModal').classList.remove('modal-hidden');
          document.getElementById('modalOverlay').classList.remove('modal-hidden');
        });
      }

      // Settings Modal Toggles
      const btnModalSfx = document.getElementById('btnModalSfxToggle');
      if (btnModalSfx) {
        btnModalSfx.addEventListener('click', () => {
          window.soundManager.toggle();
          this.updateSettingsPills();
        });
      }

      const btnModalTouch = document.getElementById('btnModalTouchToggle');
      if (btnModalTouch) {
        btnModalTouch.addEventListener('click', () => {
          if (this.settings.touchControls === 'auto') this.settings.touchControls = 'always';
          else if (this.settings.touchControls === 'always') this.settings.touchControls = 'never';
          else this.settings.touchControls = 'auto';
          this.updateTouchControlsVisibility();
          this.updateSettingsPills();
        });
      }

      const btnModalAim = document.getElementById('btnModalAimToggle');
      if (btnModalAim) {
        btnModalAim.addEventListener('click', () => {
          this.settings.autoAim = !this.settings.autoAim;
          this.updateSettingsPills();
        });
      }

      this.renderCharacterSelectionModal();
      this.updateTouchControlsVisibility();
    }

    updateSettingsPills() {
      const sfxBtn = document.getElementById('btnModalSfxToggle');
      const touchBtn = document.getElementById('btnModalTouchToggle');
      const aimBtn = document.getElementById('btnModalAimToggle');

      if (sfxBtn) {
        sfxBtn.innerText = window.soundManager.enabled ? 'ENABLED' : 'MUTED';
        sfxBtn.classList.toggle('off', !window.soundManager.enabled);
      }
      if (touchBtn) {
        touchBtn.innerText = this.settings.touchControls.toUpperCase();
      }
      if (aimBtn) {
        aimBtn.innerText = this.settings.autoAim ? 'ENABLED' : 'DISABLED';
        aimBtn.classList.toggle('off', !this.settings.autoAim);
      }
    }

    updateTouchControlsVisibility() {
      const touchOverlay = document.getElementById('touchControls');
      if (!touchOverlay) return;

      if (this.settings.touchControls === 'always') {
        touchOverlay.style.display = 'block';
      } else if (this.settings.touchControls === 'never') {
        touchOverlay.style.display = 'none';
      } else {
        // Auto: detect touch device or small screen
        const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth < 900;
        touchOverlay.style.display = isTouch ? 'block' : 'none';
      }
    }

    renderCharacterSelectionModal() {
      const grid = document.getElementById('charSelectGrid');
      if (!grid) return;

      grid.innerHTML = '';
      CHARACTERS_DATA.forEach(c => {
        const isTeamA = c.team === 'A';
        const card = document.createElement('div');
        card.className = `char-card ${isTeamA ? 'team-a-char' : 'team-b-char'} ${c.id === this.controlledCharId ? 'selected' : ''}`;
        card.innerHTML = `
          <div class="char-card-avatar ${isTeamA ? 'team-a-avatar' : 'team-b-avatar'}">${c.avatarChar}</div>
          <div class="char-card-name">${c.name}</div>
          <div class="char-card-title">${c.title}</div>
          <div class="char-card-team">TEAM ${c.team} • ${c.role}</div>
          <div class="char-card-ability">${c.abilityIcon} ${c.abilityName} (${c.abilityCooldown}s CD)</div>
          <div class="char-card-desc">${c.abilityDesc}</div>
        `;

        card.addEventListener('click', () => {
          this.controlledCharId = c.id;
          document.querySelectorAll('.char-card').forEach(el => el.classList.remove('selected'));
          card.classList.add('selected');
          this.startRound();
        });

        grid.appendChild(card);
      });
    }

    updateRosterHud() {
      const rosterA = document.getElementById('rosterA');
      const rosterB = document.getElementById('rosterB');
      if (!rosterA || !rosterB) return;

      const teamAPlayers = this.players.filter(p => p.team === 'A');
      const teamBPlayers = this.players.filter(p => p.team === 'B');

      rosterA.innerHTML = teamAPlayers.map(p => this.createRosterItemHtml(p)).join('');
      rosterB.innerHTML = teamBPlayers.map(p => this.createRosterItemHtml(p)).join('');
    }

    createRosterItemHtml(p) {
      const isDead = p.isDead || p.hp <= 0;
      const hpPct = Math.max(0, (p.hp / p.maxHp) * 100);
      const isYou = p.id === this.controlledCharId;

      return `
        <div class="roster-member ${isDead ? 'dead' : ''}">
          <div class="roster-avatar-mini">${p.avatarChar}</div>
          <div class="roster-info">
            <div class="roster-name">${p.name} [${p.title}]${isYou ? ' ★' : ''}</div>
            <div class="roster-hp-bar">
              <div class="roster-hp-val" style="width: ${hpPct}%;"></div>
            </div>
          </div>
        </div>
      `;
    }

    updatePlayerHud() {
      const player = this.getPlayer();
      if (!player) return;

      const nameEl = document.getElementById('playerHeroName');
      const roleEl = document.getElementById('playerHeroRole');
      const avatarEl = document.getElementById('playerAvatar');
      const hpFill = document.getElementById('playerHpFill');
      const hpText = document.getElementById('playerHpText');
      const ammoDisplay = document.getElementById('ammoDisplay');
      const ammoFill = document.getElementById('ammoFill');
      const dashInd = document.getElementById('dashIndicator');

      if (nameEl) nameEl.innerText = `${player.name} [${player.title}]`;
      if (roleEl) roleEl.innerText = `${player.role} • ${player.weaponName}`;
      if (avatarEl) {
        avatarEl.innerText = player.avatarChar;
        avatarEl.style.background = player.team === 'A'
          ? 'linear-gradient(135deg, #00b0ff, #00e5ff)'
          : 'linear-gradient(135deg, #ff3d00, #ff9100)';
      }

      const hpPct = Math.max(0, (player.hp / player.maxHp) * 100);
      if (hpFill) {
        hpFill.style.width = `${hpPct}%`;
        hpFill.style.background = hpPct < 30 ? '#ff1744' : (hpPct < 60 ? '#ffd600' : 'linear-gradient(90deg, #00e676, #76ff03)');
      }
      if (hpText) hpText.innerText = `${Math.ceil(player.hp)} / ${player.maxHp}`;

      if (ammoDisplay) {
        if (player.isReloading) {
          ammoDisplay.innerText = 'RELOADING...';
          ammoDisplay.style.color = '#ffd600';
        } else {
          ammoDisplay.innerText = `${player.ammo} / ${player.clipSize}`;
          ammoDisplay.style.color = player.ammo <= 3 ? '#ff1744' : '#ffd600';
        }
      }

      if (ammoFill) {
        const ammoPct = player.isReloading
          ? (player.reloadProgress / player.reloadTime) * 100
          : (player.ammo / player.clipSize) * 100;
        ammoFill.style.width = `${ammoPct}%`;
      }

      if (dashInd) {
        const canDash = player.dashCooldownTimer <= 0 && !player.isDead;
        dashInd.classList.toggle('cooldown', !canDash);
        dashInd.innerText = canDash ? 'DASH [SPACE]' : `DASH (${player.dashCooldownTimer.toFixed(1)}s)`;
      }

      // Special Ability HUD & Mobile Action Cluster
      const abilityIcon = document.getElementById('abilityIcon');
      const abilityName = document.getElementById('abilityNameText');
      const abilityKey = document.getElementById('abilityKeyText');
      const abilityFill = document.getElementById('abilityFill');
      const abilityInd = document.getElementById('abilityIndicator');

      const mobileAbilityIcon = document.getElementById('mobileAbilityIcon');
      const mobileAbilityName = document.getElementById('mobileAbilityName');
      const mobileAbilityCd = document.getElementById('mobileAbilityCd');
      const btnMobileAbility = document.getElementById('btnMobileAbility');

      const canUseAbility = player.abilityCooldownTimer <= 0 && !player.isDead;

      if (abilityIcon) abilityIcon.innerText = player.abilityIcon;
      if (abilityName) abilityName.innerText = player.abilityName.toUpperCase();
      if (abilityKey) abilityKey.innerText = canUseAbility ? '[E]' : `${player.abilityCooldownTimer.toFixed(1)}s`;

      if (abilityInd) {
        abilityInd.classList.toggle('cooldown', !canUseAbility);
      }

      if (abilityFill) {
        const cdTotal = player.abilityCooldown || 10;
        const fillPct = canUseAbility ? 100 : Math.max(0, ((cdTotal - player.abilityCooldownTimer) / cdTotal) * 100);
        abilityFill.style.width = `${fillPct}%`;
      }

      if (mobileAbilityIcon) mobileAbilityIcon.innerText = player.abilityIcon;
      if (mobileAbilityName) mobileAbilityName.innerText = player.abilityName.toUpperCase();
      if (mobileAbilityCd) {
        mobileAbilityCd.innerText = canUseAbility ? 'READY' : `${player.abilityCooldownTimer.toFixed(1)}s`;
      }
      if (btnMobileAbility) {
        btnMobileAbility.classList.toggle('cooldown', !canUseAbility);
      }
    }

    updateTimerDisplay() {
      const timerEl = document.getElementById('matchTimer');
      if (!timerEl) return;
      const mins = Math.floor(this.matchTimer / 60);
      const secs = Math.floor(this.matchTimer % 60);
      timerEl.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    notifyStatus(msg) {
      const banner = document.getElementById('statusBanner');
      if (!banner) return;
      banner.innerText = msg;
    }

    addKillFeedEntry(killer, victim) {
      const feed = document.getElementById('killFeed');
      if (!feed) return;

      const pill = document.createElement('div');
      pill.className = 'kill-pill';
      pill.innerHTML = `
        <span class="${killer.team === 'A' ? 'killer-a' : 'killer-b'}">${killer.name}</span>
        <span class="kill-icon">💥</span>
        <span class="${victim.team === 'A' ? 'victim-a' : 'victim-b'}">${victim.name}</span>
      `;
      feed.prepend(pill);

      setTimeout(() => {
        if (pill.parentNode) pill.parentNode.removeChild(pill);
      }, 4000);
    }

    togglePause() {
      this.isPaused = !this.isPaused;
      const overlay = document.getElementById('modalOverlay');
      const pauseModal = document.getElementById('pauseModal');
      const gameOverModal = document.getElementById('gameOverModal');

      if (this.isPaused) {
        overlay.classList.remove('modal-hidden');
        pauseModal.classList.remove('modal-hidden');
        gameOverModal.classList.add('modal-hidden');
        this.updateSettingsPills();
      } else {
        overlay.classList.add('modal-hidden');
        pauseModal.classList.add('modal-hidden');
      }
    }

    hideModals() {
      document.getElementById('modalOverlay').classList.add('modal-hidden');
      document.getElementById('pauseModal').classList.add('modal-hidden');
      document.getElementById('gameOverModal').classList.add('modal-hidden');
    }

    showGameOverModal(winnerTeam) {
      const overlay = document.getElementById('modalOverlay');
      const pauseModal = document.getElementById('pauseModal');
      const gameOverModal = document.getElementById('gameOverModal');
      const banner = document.getElementById('gameResultBanner');
      const subtitle = document.getElementById('resultSubtitle');
      const mvpName = document.getElementById('mvpName');
      const mvpStats = document.getElementById('mvpStats');
      const scoreboardBody = document.getElementById('scoreboardBody');

      pauseModal.classList.add('modal-hidden');
      gameOverModal.classList.remove('modal-hidden');
      overlay.classList.remove('modal-hidden');

      const isTeamAWinner = winnerTeam === 'A';
      banner.innerText = `TEAM ${winnerTeam} VICTORY!`;
      banner.className = `trophy-banner ${isTeamAWinner ? 'banner-team-a' : 'banner-team-b'}`;
      subtitle.innerText = isTeamAWinner
        ? 'Suganeesh, Karthikeyan & Jaswanth won the round!'
        : 'Sudharsan, Sakin & Sriram conquered the battlefield!';

      // Determine MVP (highest kills, then damage)
      const sorted = [...this.players].sort((a, b) => (b.kills * 100 + b.damageDealt) - (a.kills * 100 + a.damageDealt));
      const mvp = sorted[0];

      if (mvp) {
        mvpName.innerText = `${mvp.name} (TEAM ${mvp.team})`;
        mvpStats.innerText = `${mvp.kills} Kills • ${Math.round(mvp.damageDealt)} Damage Dealt`;
      }

      // Populate Scoreboard Table
      if (scoreboardBody) {
        scoreboardBody.innerHTML = sorted.map(p => `
          <tr>
            <td style="font-weight: 800;">${p.name} ${p.id === this.controlledCharId ? '★' : ''}</td>
            <td class="${p.team === 'A' ? 'sb-team-a' : 'sb-team-b'}">TEAM ${p.team}</td>
            <td>${p.kills}</td>
            <td>${Math.round(p.damageDealt)}</td>
            <td class="${p.isDead ? 'sb-dead' : 'sb-alive'}">${p.isDead ? 'ELIMINATED' : 'ALIVE'}</td>
          </tr>
        `).join('');
      }
    }
  }

  // Start game on load
  window.addEventListener('DOMContentLoaded', () => {
    window.machanGame = new Game();
  });
})();
