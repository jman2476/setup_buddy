# Scaling Planning
I need to figure out how to add scale and real world units to the program.
After writing this document, maybe this'll be a few git branches instead of one xD.

## What are we going to do in this branch?
I think the first thing to add would be scale tables and walls. People don't measure the real world in pixels, so lets create a way to see real units. Changeable boundaries and non-table elements are important, but can be in the next branch.

## What am I ACTUALLY going to do in this branch/sub-branches?
- realtable-implementation -> replace all Table objects with RealTable objects, use RealTable.alias to access corresponding Table object
- scale-object -> create a Scale object that will take a distance in pixels and a corresponding real length unit measurement in ft/m
### and after that
- chair-object -> create a Chair class with:
   - Chair -> props(length, width)
   - ChairField -> props(Chair, length, width, columns, rows, numberOfChairs)
- slapdash-backend -> python or js server 
   - basic login w/ username/password
   - save and load setups
   - MySQL or SQLite?

## Then REFACTORING
- Transfer to NextJS
- Find packages that handle shape drawing
- Adjust collision, add table on table collision

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