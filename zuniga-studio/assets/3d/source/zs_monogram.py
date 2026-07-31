"""ZS intertwined monogram — geometric sans (Space Grotesk), beveled, Z behind/below S.

Letters lie in the XY plane and are extruded along +Z (thickness). The Z is shifted
down/left and recessed in depth so it reads as sitting behind the S; the two letters
overlap where the Z diagonal crosses the lower curve of the S. Front and back profile
loops carry a modest fillet (the "bevel"). The result is a single watertight solid,
centred on the origin, upright (neutral pose) for free rotation in animation.
"""
from build123d import (
    Text, Align, extrude, fillet, Pos, Rotation,
    Axis,
)

FONT_PATH = "/home/adam/workspace/fonts/SpaceGrotesk-Bold.otf"

FONT_SIZE = 100.0     # nominal cap-height units (model is in mm)
THICKNESS = 22.0      # extrusion depth of each letter
RECESS    = 6.0       # how far the Z is pushed back behind the S
OVERLAP   = 0.26      # fraction of combined width the letters overlap in plan
Y_DROP    = 0.10      # Z dropped below S, as fraction of letter height
BEVEL     = 1.4       # fillet radius on the front/back profile loops (mm)


def _letter(ch):
    sk = Text(ch, font_size=FONT_SIZE, font_path=FONT_PATH,
              align=(Align.CENTER, Align.CENTER))
    solid = extrude(sk, amount=THICKNESS)
    # modest bevel: round the front (z=max) and back (z=0) profile loops
    try:
        groups = solid.edges().group_by(Axis.Z)
        loop = groups[0] + groups[-1]
        solid = fillet(loop, radius=BEVEL)
    except Exception:
        pass
    return solid


def gen_step():
    z = _letter("Z")
    s = _letter("S")

    zb, sb = z.bounding_box(), s.bounding_box()
    zw, sw = zb.size.X, sb.size.X
    h = max(zb.size.Y, sb.size.Y)

    spacing = (zw + sw) / 2.0 * (1.0 - OVERLAP)
    s_x = +spacing / 2.0
    z_x = -spacing / 2.0
    z_y = -Y_DROP * h

    s_pos = Pos(s_x, 0, 0) * s
    z_pos = Pos(z_x, z_y, -RECESS) * z

    lig = s_pos + z_pos  # fuse into a single solid ligature

    # Stand the ligature upright: built in XY (height=Y, thickness=Z); rotate so
    # height runs up the Z axis and thickness runs along Y. This makes the letters
    # face forward (+Y) with Z up, which the Y-up GLB export maps to a forward-facing,
    # upright model ready to rotate for animation.
    lig = Rotation(90, 0, 0) * lig

    # recentre the whole ligature on the origin (neutral, rotation-friendly pose)
    bb = lig.bounding_box()
    c = bb.center()
    lig = Pos(-c.X, -c.Y, -c.Z) * lig

    lig.label = "ZS_monogram"
    return lig


if __name__ == "__main__":
    part = gen_step()
    print("bbox:", part.bounding_box())
    print("volume:", round(part.volume, 1))
