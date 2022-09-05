/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
exports.findAllSolutions = function(grid, dictionary) {
    if (grid.length == 0){
        return []
    }
    for (i = 0; i < grid.length; i ++){
        if (grid[i].length == 0){
            return []
        }
    }
    let newDictionary = [];
    let solutions = [];

    for (i = 0; i < grid.length; i++){
        for (j = 0; j < grid.length; j++){
            x = grid[i][j].toLowerCase()
            grid[i][j] = x
        }
    }
    for (i=0; i<dictionary.length; i++){
        if (dictionary[i].length > 2){
            newDictionary.push(dictionary[i].toLowerCase())
        }
    }
    let map = {}
    for (i = 0; i < grid.length; i++){
        for (j = 0; j < grid.length; j++){
            if (map[grid[i][j]] == null){
                map[grid[i][j]] = []
            }
            ind = [i,j]
            map[grid[i][j]].push(ind)
        }
    }
    for (i=0;i<newDictionary.length; i++){
        let firstLetter = newDictionary[i][0];
        if (firstLetter in map){
            let lst = map[firstLetter]
            if (chance(grid,newDictionary[i],firstLetter,lst)==true){
                solutions.push(newDictionary[i])
            }
        }
        else {
            let b = newDictionary[i].substring(0,2)
            if (b in map){
                let lst = map[b]
                if (chance(grid,newDictionary[i],b,lst)==true){
                    solutions.push(newDictionary[i])
                }
            }
        }


    }
    return solutions;
}

function chance(grid,word,firstLetter,lst){
    beginning = 0
    while (beginning < lst.length){
        index = lst[beginning]
        x = index[0]
        y = index[1]
        if (firstLetter.length == 1){
            ind = 1
        }
        else if (firstLetter.length == 2){
            ind = 2
        }
        let visited = new Set()
        visited.add([x,y])
        if (dfs(grid,word,x,y,visited,ind)==true){
            return true
        }
        beginning = beginning + 1
    }
    return false
}

function dfs(grid, word, x, y, visited, ind){
    if (ind >= word.length){
        return true
    }

    if (isValid(grid, word, x + 1, y + 1, visited, ind)==true){
        next = [x+1,y+1]
        visited.add(next)
        if (grid[x+1][y+1].length > 1){
            if (dfs(grid, word, x + 1, y + 1, visited, ind + 2)==true){
                return true
            }
        }
        else if (dfs(grid, word, x + 1, y + 1, visited, ind + 1)==true){
            return true
        }
    }
    if (isValid(grid, word, x - 1, y + 1, visited, ind)==true){
        next = [x-1,y+1]
        visited.add(next)
        if (grid[x-1][y+1].length > 1){
            if (dfs(grid, word, x - 1, y + 1, visited, ind + 2)==true){
                return true
            }
        }
        else if (dfs(grid, word, x - 1, y + 1, visited, ind + 1)==true){
            return true
        }
    }
    if (isValid(grid, word, x + 1, y - 1, visited, ind)==true){
        next = [x+1,y-1]
        visited.add(next)
        if (grid[x+1][y-1].length > 1){
            if (dfs(grid, word, x + 1, y - 1, visited, ind + 2)==true){
                return true
            }
        }
        else if (dfs(grid, word, x + 1, y - 1, visited, ind + 1)==true){
            return true
        }
    }
    if (isValid(grid, word, x - 1, y - 1, visited, ind)==true){
        next = [x-1,y-1]
        visited.add(next)
        if (grid[x-1][y-1].length > 1){
            if (dfs(grid, word, x - 1, y - 1, visited, ind + 2)==true){
                return true
            }
        }
        else if (dfs(grid, word, x - 1, y - 1, visited, ind + 1)==true){
            return true
        }
    }
    if (isValid(grid, word, x + 1, y, visited, ind)==true){
        next = [x+1,y]
        visited.add(next)
        if (grid[x+1][y].length > 1){
            if (dfs(grid, word, x + 1, y, visited, ind + 2)==true){
                return true
            }
        }
        else if (dfs(grid, word, x + 1, y, visited, ind + 1)==true){
            return true
        }
    }
    if (isValid(grid, word, x - 1, y, visited, ind)==true){
        next = [x-1,y]
        visited.add(next)
        if (grid[x-1][y].length > 1){
            if (dfs(grid, word, x - 1, y, visited, ind + 2)==true){
                return true
            }
        }
        else if (dfs(grid, word, x - 1, y, visited, ind + 1)==true){
            return true
        }
    }
    if (isValid(grid, word, x, y + 1, visited, ind)==true){
        next = [x,y+1]
        visited.add(next)
        if (grid[x][y+1].length > 1){
            if (dfs(grid, word, x, y + 1, visited, ind + 2)==true){
                return true
            }
        }
        else if (dfs(grid, word, x, y + 1, visited, ind + 1)==true){
            return true
        }
    }
    if (isValid(grid, word, x, y - 1, visited, ind)==true){
        next = [x,y-1]
        visited.add(next)
        if (grid[x][y-1].length > 1){
            if (dfs(grid, word, x, y - 1, visited, ind + 2)==true){
                return true
            }
        }
        else if (dfs(grid, word, x, y - 1, visited, ind + 1)==true){
            return true
        }
    }
    return false;
}

function isValid(grid, word, x, y, visited, ind){
    if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length){
        return false
    }
    if (grid[x][y].length > 1){
        if (ind+2 > word.length){
            return false
        }
        if ([x,y] in visited || grid[x][y] != word.substring(ind,ind+2)){
            return false
        }
    }
    else if ([x,y] in visited || grid[x][y] != word[ind]){
        return false
    }
    return true
}


var grid = [['T', 'W', 'Y', 'R'],
    ['E', 'N', 'P', 'H'],
    ['G', 'Z', 'Qu', 'R'],
    ['St', 'N', 'T', 'A']];
var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];

console.log(exports.findAllSolutions(grid, dictionary));
