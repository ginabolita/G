#version 330 core
in vec2 vtexCoord;
in vec4 frontColor;
out vec4 fragColor;
uniform sampler2D colormap;
const float scale = 8.0;

void main() {
  vec2 uv = vtexCoord * scale;
  int fdx = int(uv.s) % int(scale);
  int fdy = int(uv.t) % int(scale);

  // The texture has 6 elements horizontally
  float elementWidth = 1.0 / 6.0;

  // Map local coordinates to texture coordinates
  vec2 localCoord = vec2(fract(uv.s), fract(uv.t));

  // Select texture element based on position
  float xOffset = 5.0 * elementWidth;  // Default to pellet

  // Maze layout (8x8 grid)
  // 0: empty with pellet, 1: horizontal wall, 2: vertical wall,
  // 3: top-left corner, 4: top-right corner, 5: bottom-left corner,
  // 6: bottom-right corner, 7: ghost, 8: pacman
  int[64] maze =
      int[](6, 1, 1, 1, 1, 1, 1, 5,  // Row 0 (now using 5,6 instead of 3,4)
            2, 0, 0, 0, 0, 0, 0, 2,  // Row 1
            2, 0, 6, 1, 5, 0, 0, 2,  // Row 2 (now using 5,6 instead of 3,4)
            2, 0, 2, 7, 2, 0, 8, 2,  // Row 3
            2, 0, 4, 1, 3, 0, 0, 2,  // Row 4 (now using 3,4 instead of 5,6)
            2, 0, 0, 0, 0, 0, 0, 2,  // Row 5
            2, 0, 0, 0, 0, 7, 0, 2,  // Row 6
            4, 1, 1, 1, 1, 1, 1, 3   // Row 7 (now using 3,4 instead of 5,6)
      );

  int cellType = maze[fdy * int(scale) + fdx];

  if (cellType == 1) {
    // Horizontal wall
    xOffset = 3.0 * elementWidth;
  } else if (cellType == 2) {
    // Vertical wall - rotate horizontal wall
    xOffset = 3.0 * elementWidth;
    // Swap x and y for rotation
    localCoord = vec2(localCoord.y, localCoord.x);
  } else if (cellType == 3) {
    // Top-left corner (now bottom-right since 180° rotated)
    xOffset = 4.0 * elementWidth;
  } else if (cellType == 4) {
    // Top-right corner (now bottom-left since 180° rotated)
    xOffset = 4.0 * elementWidth;
    localCoord.x = 1.0 - localCoord.x;
  } else if (cellType == 5) {
    // Bottom-left corner (now top-right since 180° rotated)
    xOffset = 4.0 * elementWidth;
    localCoord.y = 1.0 - localCoord.y;
  } else if (cellType == 6) {
    // Bottom-right corner (now top-left since 180° rotated)
    xOffset = 4.0 * elementWidth;
    localCoord = vec2(1.0 - localCoord.x, 1.0 - localCoord.y);
  } else if (cellType == 7) {
    // Ghost
    xOffset = 0.0 * elementWidth;
  } else if (cellType == 8) {
    // Pacman
    xOffset = 1.0 * elementWidth;
  } else {
    // Empty with pellet (0)
    xOffset = 5.0 * elementWidth;
  }

  // Final texture coordinate
  vec2 finalCoord = vec2(xOffset + localCoord.x * elementWidth, localCoord.y);

  fragColor = texture(colormap, finalCoord);
}