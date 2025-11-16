#Collision Planning
Goal: write out the algorithm to check table collision
        - Table-Boundary collision
        - Table-Table collision

## Table-Boundary collision
### Values available
    - Boundary vertices DOMRect:
        - x-axis: Left, Right, width, X
        - y-axis: Bottom, Top, height, Y
    - Table DOMRect:
        - x-axis: Left, Right, width, X
        - y-axis: Bottom, Top, height, Y
    - Setup area DOMRect: 
        - x-axis: Left, Right, width, X
        - y-axis: Bottom, Top, height, Y

### What do we need?
    - Figure out what counts as 'inside' or 'outside'
        - Define a CENTER_OF_MASS (COM) for the space
        - set as average of all 
            - Will not work in all situations, but 
                can be improved later
    - Check that points on the table are between
        boundary point line and CENTER_OF_MASS (COM)

### Algorithm Attempt 1
#### Steps
    - Build list of lines and "inside" directions
        - A line consists of two adjacent points
        - get slope m between two points
        - get centerpoint of line
        - Subtract  COM coordinates from centerpoint coordinates
        - If value is negative, COM is further from origin than centerpoint
        - If value is positive, COM is closer to origin than centerpoint
        - Return {point1:[x1,y1], point2:[x2,y2], slope:m, direction:[direction_X, direction_Y]} per line
    - Check single table against all lines
        - For each of the four sides, compare to the line
        - If any point fails, return the point and the line and a failure state
