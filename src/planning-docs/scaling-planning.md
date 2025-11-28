# Scaling Planning
I need to figure out how to add scale and real world units to the program.
After writing this document, maybe this'll be a few git branches instead of one xD.

## Things to have
- Make a table with specific dimensions
   - maybe a RealTable class that can take a shape and dimensions, and use that to construct the Round|Long|Square table
   - needs to have standard and custom options
      - 3ft square table
      - 3ftx8ft long table
      - 6ft? diameter round table
      - 3ftx6ft long table
      - Custom table
   - save the table types, and name them
- Make a floor plan of specific dimensions
   - Type in room dimensions and autogenerate
   - Select an edge of the room and see the dimensions
      - Edit the dimension to change the size of the room
   - Each wall should be drawn once there are two points, instead of being draw once the collision checks take place
- Add in non-table elements
   - Obstacles:
      - Posts
      - Fixtures/Structures
         - Stages/Trash cans
      - Misc.
   - Non-obstacles:
      - dance floor
      - area definition (non collision border, "kids seating", "VIP section", etc)
   - Boundary objects:
      - Doors/windows
      - Reference objects
      - Lights
- Label everything
   - Name tables
   - Name walls
   - Name objects