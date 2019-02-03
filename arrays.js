all
Returns true if the provided predicate function returns true for all elements in a collection, false otherwise.

Use Array.prototype.every() to test if all elements in the collection return true based on fn. Omit the second argument, fn, to use Boolean as a default.


const all = (arr, fn = Boolean) => arr.every(fn);
EXAMPLES
all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
allEqual
Check if all elements in an array are equal.

Use Array.prototype.every() to check if all the elements of the array are the same as the first one.


const allEqual = arr => arr.every(val => val === arr[0]);
EXAMPLES
allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
any
Returns true if the provided predicate function returns true for at least one element in a collection, false otherwise.

Use Array.prototype.some() to test if any elements in the collection return true based on fn. Omit the second argument, fn, to use Boolean as a default.


const any = (arr, fn = Boolean) => arr.some(fn);
EXAMPLES
any([0, 1, 2, 0], x => x >= 2); // true
any([0, 0, 1, 0]); // true
arrayToCSV
Converts a 2D array to a comma-separated values (CSV) string.

Use Array.prototype.map() and Array.prototype.join(delimiter) to combine individual 1D arrays (rows) into strings. Use Array.prototype.join('\n') to combine all rows into a CSV string, separating each row with a newline. Omit the second argument, delimiter, to use a default delimiter of ,.


const arrayToCSV = (arr, delimiter = ',') =>
  arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join('\n');
EXAMPLES
arrayToCSV([['a', 'b'], ['c', 'd']]); // '"a","b"\n"c","d"'
arrayToCSV([['a', 'b'], ['c', 'd']], ';'); // '"a";"b"\n"c";"d"'
bifurcate
Splits values into two groups. If an element in filter is truthy, the corresponding element in the collection belongs to the first group; otherwise, it belongs to the second group.

Use Array.prototype.reduce() and Array.prototype.push() to add elements to groups, based on filter.


const bifurcate = (arr, filter) =>
  arr.reduce((acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc), [[], []]);
EXAMPLES
bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]); // [ ['beep', 'boop', 'bar'], ['foo'] ]
bifurcateBy
Splits values into two groups according to a predicate function, which specifies which group an element in the input collection belongs to. If the predicate function returns a truthy value, the collection element belongs to the first group; otherwise, it belongs to the second group.

Use Array.prototype.reduce() and Array.prototype.push() to add elements to groups, based on the value returned by fn for each element.


const bifurcateBy = (arr, fn) =>
  arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [[], []]);
EXAMPLES
bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b'); // [ ['beep', 'boop', 'bar'], ['foo'] ]
chunk
Chunks an array into smaller arrays of a specified size.

Use Array.from() to create a new array, that fits the number of chunks that will be produced. Use Array.prototype.slice() to map each element of the new array to a chunk the length of size. If the original array can't be split evenly, the final chunk will contain the remaining elements.


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
EXAMPLES
chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]
compact
Removes falsey values from an array.

Use Array.prototype.filter() to filter out falsey values (false, null, 0, "", undefined, and NaN).


const compact = arr => arr.filter(Boolean);
EXAMPLES
compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // [ 1, 2, 3, 'a', 's', 34 ]
countBy
Groups the elements of an array based on the given function and returns the count of elements in each group.

Use Array.prototype.map() to map the values of an array to a function or property name. Use Array.prototype.reduce() to create an object, where the keys are produced from the mapped results.


const countBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
EXAMPLES
countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
countBy(['one', 'two', 'three'], 'length'); // {3: 2, 5: 1}
countOccurrences
Counts the occurrences of a value in an array.

Use Array.prototype.reduce() to increment a counter each time you encounter the specific value inside the array.


const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
EXAMPLES
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
deepFlatten
Deep flattens an array.

Use recursion. Use Array.prototype.concat() with an empty array ([]) and the spread operator (...) to flatten an array. Recursively flatten each element that is an array.


const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
EXAMPLES
deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
difference
Returns the difference between two arrays.

Create a Set from b, then use Array.prototype.filter() on a to only keep values not contained in b.


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};
EXAMPLES
difference([1, 2, 3], [1, 2, 4]); // [3]
differenceBy
Returns the difference between two arrays, after applying the provided function to each array element of both.

Create a Set by applying fn to each element in b, then use Array.prototype.filter() in combination with fn on a to only keep values not contained in the previously created set.


const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.filter(x => !s.has(fn(x)));
};
EXAMPLES
differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [ { x: 2 } ]
differenceWith
Filters out all values from an array for which the comparator function does not return true.

Use Array.prototype.filter() and Array.prototype.findIndex() to find the appropriate values.


const differenceWith = (arr, val, comp) => arr.filter(a => val.findIndex(b => comp(a, b)) === -1);
EXAMPLES
differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b)); // [1, 1.2]
drop
Returns a new array with n elements removed from the left.

Use Array.prototype.slice() to slice the remove the specified number of elements from the left.


const drop = (arr, n = 1) => arr.slice(n);
EXAMPLES
drop([1, 2, 3]); // [2,3]
drop([1, 2, 3], 2); // [3]
drop([1, 2, 3], 42); // []
dropRight
Returns a new array with n elements removed from the right.

Use Array.prototype.slice() to slice the remove the specified number of elements from the right.


const dropRight = (arr, n = 1) => arr.slice(0, -n);
EXAMPLES
dropRight([1, 2, 3]); // [1,2]
dropRight([1, 2, 3], 2); // [1]
dropRight([1, 2, 3], 42); // []
dropRightWhile
Removes elements from the end of an array until the passed function returns true. Returns the remaining elements in the array.

Loop through the array, using Array.prototype.slice() to drop the last element of the array until the returned value from the function is true. Returns the remaining elements.


const dropRightWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[arr.length - 1])) arr = arr.slice(0, -1);
  return arr;
};
EXAMPLES
dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]
dropWhile
Removes elements in an array until the passed function returns true. Returns the remaining elements in the array.

Loop through the array, using Array.prototype.slice() to drop the first element of the array until the returned value from the function is true. Returns the remaining elements.


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};
EXAMPLES
dropWhile([1, 2, 3, 4], n => n >= 3); // [3,4]
everyNth
Returns every nth element in an array.

Use Array.prototype.filter() to create a new array that contains every nth element of a given array.


const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);
EXAMPLES
everyNth([1, 2, 3, 4, 5, 6], 2); // [ 2, 4, 6 ]
filterFalsy
Filters out the falsy values in an array.

Use Array.prototype.filter() to get an array containing only truthy values.


const filterFalsy = arr => arr.filter(Boolean);
EXAMPLES
filterFalsy(['', true, {}, false, 'sample', 1, 0]); // [true, {}, 'sample', 1]
filterNonUnique
Filters out the non-unique values in an array.

Use Array.prototype.filter() for an array containing only the unique values.


const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
EXAMPLES
filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]
filterNonUniqueBy
Filters out the non-unique values in an array, based on a provided comparator function.

Use Array.prototype.filter() and Array.prototype.every() for an array containing only the unique values, based on the comparator function, fn. The comparator function takes four arguments: the values of the two elements being compared and their indexes.


const filterNonUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));
EXAMPLES
filterNonUniqueBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 2, value: 'c' } ]
findLast
Returns the last element for which the provided function returns a truthy value.

Use Array.prototype.filter() to remove elements for which fn returns falsey values, Array.prototype.pop() to get the last one.


const findLast = (arr, fn) => arr.filter(fn).pop();
EXAMPLES
findLast([1, 2, 3, 4], n => n % 2 === 1); // 3
findLastIndex
Returns the index of the last element for which the provided function returns a truthy value.

Use Array.prototype.map() to map each element to an array with its index and value. Use Array.prototype.filter() to remove elements for which fn returns falsey values, Array.prototype.pop() to get the last one.


const findLastIndex = (arr, fn) =>
  arr
    .map((val, i) => [i, val])
    .filter(([i, val]) => fn(val, i, arr))
    .pop()[0];
EXAMPLES
findLastIndex([1, 2, 3, 4], n => n % 2 === 1); // 2 (index of the value 3)
flatten
Flattens an array up to the specified depth.

Use recursion, decrementing depth by 1 for each level of depth. Use Array.prototype.reduce() and Array.prototype.concat() to merge elements or arrays. Base case, for depth equal to 1 stops recursion. Omit the second argument, depth to flatten only to a depth of 1 (single flatten).


const flatten = (arr, depth = 1) =>
  arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);
EXAMPLES
flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]
forEachRight
Executes a provided function once for each array element, starting from the array's last element.

Use Array.prototype.slice(0) to clone the given array, Array.prototype.reverse() to reverse it and Array.prototype.forEach() to iterate over the reversed array.


const forEachRight = (arr, callback) =>
  arr
    .slice(0)
    .reverse()
    .forEach(callback);
EXAMPLES
forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'
groupBy
Groups the elements of an array based on the given function.

Use Array.prototype.map() to map the values of an array to a function or property name. Use Array.prototype.reduce() to create an object, where the keys are produced from the mapped results.


const groupBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || []).concat(arr[i]);
    return acc;
  }, {});
EXAMPLES
groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
groupBy(['one', 'two', 'three'], 'length'); // {3: ['one', 'two'], 5: ['three']}
head
Returns the head of a list.

Use arr[0] to return the first element of the passed array.


const head = arr => arr[0];
EXAMPLES
head([1, 2, 3]); // 1
indexOfAll
Returns all indices of val in an array. If val never occurs, returns [].

Use Array.prototype.reduce() to loop over elements and store indices for matching elements. Return the array of indices.


const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
EXAMPLES
indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
indexOfAll([1, 2, 3], 4); // []
initial
Returns all the elements of an array except the last one.

Use arr.slice(0,-1) to return all but the last element of the array.


const initial = arr => arr.slice(0, -1);
EXAMPLES
initial([1, 2, 3]); // [1,2]
initialize2DArray
Initializes a 2D array of given width and height and value.

Use Array.prototype.map() to generate h rows where each is a new array of size w initialize with value. If the value is not provided, default to null.


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));
EXAMPLES
initialize2DArray(2, 2, 0); // [[0,0], [0,0]]
initializeArrayWithRange
Initializes an array containing the numbers in the specified range where start and end are inclusive with their common difference step.

Use Array.from() to create an array of the desired length, (end - start + 1)/step, and a map function to fill it with the desired values in the given range. You can omit start to use a default value of 0. You can omit step to use a default value of 1.


const initializeArrayWithRange = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end - start + 1) / step) }, (v, i) => i * step + start);
EXAMPLES
initializeArrayWithRange(5); // [0,1,2,3,4,5]
initializeArrayWithRange(7, 3); // [3,4,5,6,7]
initializeArrayWithRange(9, 0, 2); // [0,2,4,6,8]
initializeArrayWithRangeRight
Initializes an array containing the numbers in the specified range (in reverse) where start and end are inclusive with their common difference step.

Use Array.from(Math.ceil((end+1-start)/step)) to create an array of the desired length(the amounts of elements is equal to (end-start)/step or (end+1-start)/step for inclusive end), Array.prototype.map() to fill with the desired values in a range. You can omit start to use a default value of 0. You can omit step to use a default value of 1.


const initializeArrayWithRangeRight = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end + 1 - start) / step) }).map(
    (v, i, arr) => (arr.length - i - 1) * step + start
  );
EXAMPLES
initializeArrayWithRangeRight(5); // [5,4,3,2,1,0]
initializeArrayWithRangeRight(7, 3); // [7,6,5,4,3]
initializeArrayWithRangeRight(9, 0, 2); // [8,6,4,2,0]
initializeArrayWithValues
Initializes and fills an array with the specified values.

Use Array(n) to create an array of the desired length, fill(v) to fill it with the desired values. You can omit val to use a default value of 0.


const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val);
EXAMPLES
initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]
initializeNDArray
Create a n-dimensional array with given value.

Use recursion. Use Array.prototype.map() to generate rows where each is a new array initialized using initializeNDArray.


const initializeNDArray = (val, ...args) =>
  args.length === 0
    ? val
    : Array.from({ length: args[0] }).map(() => initializeNDArray(val, ...args.slice(1)));
EXAMPLES
initializeNDArray(1, 3); // [1,1,1]
initializeNDArray(5, 2, 2, 2); // [[[5,5],[5,5]],[[5,5],[5,5]]]
intersection
Returns a list of elements that exist in both arrays.

Create a Set from b, then use Array.prototype.filter() on a to only keep values contained in b.


const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};
EXAMPLES
intersection([1, 2, 3], [4, 3, 2]); // [2, 3]
intersectionBy
Returns a list of elements that exist in both arrays, after applying the provided function to each array element of both.

Create a Set by applying fn to all elements in b, then use Array.prototype.filter() on a to only keep elements, which produce values contained in b when fn is applied to them.


const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.filter(x => s.has(fn(x)));
};
EXAMPLES
intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]
intersectionWith
Returns a list of elements that exist in both arrays, using a provided comparator function.

Use Array.prototype.filter() and Array.prototype.findIndex() in combination with the provided comparator to determine intersecting values.


const intersectionWith = (a, b, comp) => a.filter(x => b.findIndex(y => comp(x, y)) !== -1);
EXAMPLES
intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)); // [1.5, 3, 0]
isSorted
Returns 1 if the array is sorted in ascending order, -1 if it is sorted in descending order or 0 if it is not sorted.

Calculate the ordering direction for the first two elements. Use Object.entries() to loop over array objects and compare them in pairs. Return 0 if the direction changes or the direction if the last element is reached.


const isSorted = arr => {
  let direction = -(arr[0] - arr[1]);
  for (let [i, val] of arr.entries()) {
    direction = !direction ? -(arr[i - 1] - arr[i]) : direction;
    if (i === arr.length - 1) return !direction ? 0 : direction;
    else if ((val - arr[i + 1]) * direction > 0) return 0;
  }
};
EXAMPLES
isSorted([0, 1, 2, 2]); // 1
isSorted([4, 3, 2]); // -1
isSorted([4, 3, 5]); // 0
join
Joins all elements of an array into a string and returns this string. Uses a separator and an end separator.

Use Array.prototype.reduce() to combine elements into a string. Omit the second argument, separator, to use a default separator of ','. Omit the third argument, end, to use the same value as separator by default.


const join = (arr, separator = ',', end = separator) =>
  arr.reduce(
    (acc, val, i) =>
      i === arr.length - 2
        ? acc + val + end
        : i === arr.length - 1
          ? acc + val
          : acc + val + separator,
    ''
  );
EXAMPLES
join(['pen', 'pineapple', 'apple', 'pen'], ',', '&'); // "pen,pineapple,apple&pen"
join(['pen', 'pineapple', 'apple', 'pen'], ','); // "pen,pineapple,apple,pen"
join(['pen', 'pineapple', 'apple', 'pen']); // "pen,pineapple,apple,pen"
JSONtoCSV
Converts an array of objects to a comma-separated values (CSV) string that contains only the columns specified.

Use Array.prototype.join(delimiter) to combine all the names in columns to create the first row. Use Array.prototype.map() and Array.prototype.reduce() to create a row for each object, substituting non-existent values with empty strings and only mapping values in columns. Use Array.prototype.join('\n') to combine all rows into a string. Omit the third argument, delimiter, to use a default delimiter of ,.


const JSONtoCSV = (arr, columns, delimiter = ',') =>
  [
    columns.join(delimiter),
    ...arr.map(obj =>
      columns.reduce(
        (acc, key) => `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
        ''
      )
    )
  ].join('\n');
EXAMPLES
JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';'); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'
last
Returns the last element in an array.

Use arr.length - 1 to compute the index of the last element of the given array and returning it.


const last = arr => arr[arr.length - 1];
EXAMPLES
last([1, 2, 3]); // 3
longestItem
Takes any number of iterable objects or objects with a length property and returns the longest one. If multiple objects have the same length, the first one will be returned. Returns undefined if no arguments are provided.

Use Array.prototype.reduce(), comparing the length of objects to find the longest one.


const longestItem = (...vals) => vals.reduce((a, x) => (x.length > a.length ? x : a));
EXAMPLES
longestItem('this', 'is', 'a', 'testcase'); // 'testcase'
longestItem(...['a', 'ab', 'abc']); // 'abc'
longestItem(...['a', 'ab', 'abc'], 'abcd'); // 'abcd'
longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
longestItem([1, 2, 3], 'foobar'); // 'foobar'
mapObject
Maps the values of an array to an object using a function, where the key-value pairs consist of the original value as the key and the mapped value.

Use an anonymous inner function scope to declare an undefined memory space, using closures to store a return value. Use a new Array to store the array with a map of the function over its data set and a comma operator to return a second step, without needing to move from one context to another (due to closures and order of operations).


const mapObject = (arr, fn) =>
  (a => (
    (a = [arr, arr.map(fn)]), a[0].reduce((acc, val, ind) => ((acc[val] = a[1][ind]), acc), {})
  ))();
EXAMPLES
const squareIt = arr => mapObject(arr, a => a * a);
squareIt([1, 2, 3]); // { 1: 1, 2: 4, 3: 9 }
maxN
Returns the n maximum elements from the provided array. If n is greater than or equal to the provided array's length, then return the original array (sorted in descending order).

Use Array.prototype.sort() combined with the spread operator (...) to create a shallow clone of the array and sort it in descending order. Use Array.prototype.slice() to get the specified number of elements. Omit the second argument, n, to get a one-element array.


const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);
EXAMPLES
maxN([1, 2, 3]); // [3]
maxN([1, 2, 3], 2); // [3,2]
minN
Returns the n minimum elements from the provided array. If n is greater than or equal to the provided array's length, then return the original array (sorted in ascending order).

Use Array.prototype.sort() combined with the spread operator (...) to create a shallow clone of the array and sort it in ascending order. Use Array.prototype.slice() to get the specified number of elements. Omit the second argument, n, to get a one-element array.


const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);
EXAMPLES
minN([1, 2, 3]); // [1]
minN([1, 2, 3], 2); // [1,2]
none
Returns true if the provided predicate function returns false for all elements in a collection, false otherwise.

Use Array.prototype.some() to test if any elements in the collection return true based on fn. Omit the second argument, fn, to use Boolean as a default.


const none = (arr, fn = Boolean) => !arr.some(fn);
EXAMPLES
none([0, 1, 3, 0], x => x == 2); // true
none([0, 0, 0]); // true
nthElement
Returns the nth element of an array.

Use Array.prototype.slice() to get an array containing the nth element at the first place. If the index is out of bounds, return undefined. Omit the second argument, n, to get the first element of the array.


const nthElement = (arr, n = 0) => (n === -1 ? arr.slice(n) : arr.slice(n, n + 1))[0];
EXAMPLES
nthElement(['a', 'b', 'c'], 1); // 'b'
nthElement(['a', 'b', 'b'], -3); // 'a'
offset
Moves the specified amount of elements to the end of the array.

Use Array.prototype.slice() twice to get the elements after the specified index and the elements before that. Use the spread operator(...) to combine the two into one array. If offset is negative, the elements will be moved from end to start.


const offset = (arr, offset) => [...arr.slice(offset), ...arr.slice(0, offset)];
EXAMPLES
offset([1, 2, 3, 4, 5], 2); // [3, 4, 5, 1, 2]
offset([1, 2, 3, 4, 5], -2); // [4, 5, 1, 2, 3]
partition
Groups the elements into two arrays, depending on the provided function's truthiness for each element.

Use Array.prototype.reduce() to create an array of two arrays. Use Array.prototype.push() to add elements for which fn returns true to the first array and elements for which fn returns false to the second one.


const partition = (arr, fn) =>
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );
EXAMPLES
const users = [{ user: 'barney', age: 36, active: false }, { user: 'fred', age: 40, active: true }];
partition(users, o => o.active); // [[{ 'user': 'fred',    'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false }]]
permutations
⚠️ WARNING: This function's execution time increases exponentially with each array element. Anything more than 8 to 10 entries will cause your browser to hang as it tries to solve all the different combinations.

Generates all permutations of an array's elements (contains duplicates).

Use recursion. For each element in the given array, create all the partial permutations for the rest of its elements. Use Array.prototype.map() to combine the element with each partial permutation, then Array.prototype.reduce() to combine all permutations in one array. Base cases are for array length equal to 2 or 1.


const permutations = arr => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [item, ...val])
      ),
    []
  );
};
EXAMPLES
permutations([1, 33, 5]); // [ [ 1, 33, 5 ], [ 1, 5, 33 ], [ 33, 1, 5 ], [ 33, 5, 1 ], [ 5, 1, 33 ], [ 5, 33, 1 ] ]
pull
Mutates the original array to filter out the values specified.

Use Array.prototype.filter() and Array.prototype.includes() to pull out the values that are not needed. Use Array.prototype.length = 0 to mutate the passed in an array by resetting it's length to zero and Array.prototype.push() to re-populate it with only the pulled values.

(For a snippet that does not mutate the original array see without)


const pull = (arr, ...args) => {
  let argState = Array.isArray(args[0]) ? args[0] : args;
  let pulled = arr.filter((v, i) => !argState.includes(v));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
};
EXAMPLES
let myArray = ['a', 'b', 'c', 'a', 'b', 'c'];
pull(myArray, 'a', 'c'); // myArray = [ 'b', 'b' ]
pullAtIndex
Mutates the original array to filter out the values at the specified indexes.

Use Array.prototype.filter() and Array.prototype.includes() to pull out the values that are not needed. Use Array.prototype.length = 0 to mutate the passed in an array by resetting it's length to zero and Array.prototype.push() to re-populate it with only the pulled values. Use Array.prototype.push() to keep track of pulled values


const pullAtIndex = (arr, pullArr) => {
  let removed = [];
  let pulled = arr
    .map((v, i) => (pullArr.includes(i) ? removed.push(v) : v))
    .filter((v, i) => !pullArr.includes(i));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
  return removed;
};
EXAMPLES
let myArray = ['a', 'b', 'c', 'd'];
let pulled = pullAtIndex(myArray, [1, 3]); // myArray = [ 'a', 'c' ] , pulled = [ 'b', 'd' ]
pullAtValue
Mutates the original array to filter out the values specified. Returns the removed elements.

Use Array.prototype.filter() and Array.prototype.includes() to pull out the values that are not needed. Use Array.prototype.length = 0 to mutate the passed in an array by resetting it's length to zero and Array.prototype.push() to re-populate it with only the pulled values. Use Array.prototype.push() to keep track of pulled values


const pullAtValue = (arr, pullArr) => {
  let removed = [],
    pushToRemove = arr.forEach((v, i) => (pullArr.includes(v) ? removed.push(v) : v)),
    mutateTo = arr.filter((v, i) => !pullArr.includes(v));
  arr.length = 0;
  mutateTo.forEach(v => arr.push(v));
  return removed;
};
EXAMPLES
let myArray = ['a', 'b', 'c', 'd'];
let pulled = pullAtValue(myArray, ['b', 'd']); // myArray = [ 'a', 'c' ] , pulled = [ 'b', 'd' ]
pullBy
Mutates the original array to filter out the values specified, based on a given iterator function.

Check if the last argument provided in a function. Use Array.prototype.map() to apply the iterator function fn to all array elements. Use Array.prototype.filter() and Array.prototype.includes() to pull out the values that are not needed. Use Array.prototype.length = 0 to mutate the passed in an array by resetting it's length to zero and Array.prototype.push() to re-populate it with only the pulled values.


const pullBy = (arr, ...args) => {
  const length = args.length;
  let fn = length > 1 ? args[length - 1] : undefined;
  fn = typeof fn == 'function' ? (args.pop(), fn) : undefined;
  let argState = (Array.isArray(args[0]) ? args[0] : args).map(val => fn(val));
  let pulled = arr.filter((v, i) => !argState.includes(fn(v)));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
};
EXAMPLES
var myArray = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
pullBy(myArray, [{ x: 1 }, { x: 3 }], o => o.x); // myArray = [{ x: 2 }]
reducedFilter
Filter an array of objects based on a condition while also filtering out unspecified keys.

Use Array.prototype.filter() to filter the array based on the predicate fn so that it returns the objects for which the condition returned a truthy value. On the filtered array, use Array.prototype.map() to return the new object using Array.prototype.reduce() to filter out the keys which were not supplied as the keys argument.


const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );
EXAMPLES
const data = [
  {
    id: 1,
    name: 'john',
    age: 24
  },
  {
    id: 2,
    name: 'mike',
    age: 50
  }
];

reducedFilter(data, ['id', 'name'], item => item.age > 24); // [{ id: 2, name: 'mike'}]
reduceSuccessive
Applies a function against an accumulator and each element in the array (from left to right), returning an array of successively reduced values.

Use Array.prototype.reduce() to apply the given function to the given array, storing each new result.


const reduceSuccessive = (arr, fn, acc) =>
  arr.reduce((res, val, i, arr) => (res.push(fn(res.slice(-1)[0], val, i, arr)), res), [acc]);
EXAMPLES
reduceSuccessive([1, 2, 3, 4, 5, 6], (acc, val) => acc + val, 0); // [0, 1, 3, 6, 10, 15, 21]
reduceWhich
Returns the minimum/maximum value of an array, after applying the provided function to set comparing rule.

Use Array.prototype.reduce() in combination with the comparator function to get the appropriate element in the array. You can omit the second parameter, comparator, to use the default one that returns the minimum element in the array.


const reduceWhich = (arr, comparator = (a, b) => a - b) =>
  arr.reduce((a, b) => (comparator(a, b) >= 0 ? b : a));
EXAMPLES
reduceWhich([1, 3, 2]); // 1
reduceWhich([1, 3, 2], (a, b) => b - a); // 3
reduceWhich(
  [{ name: 'Tom', age: 12 }, { name: 'Jack', age: 18 }, { name: 'Lucy', age: 9 }],
  (a, b) => a.age - b.age
); // {name: "Lucy", age: 9}
reject
Takes a predicate and array, like Array.prototype.filter(), but only keeps x if pred(x) === false.


const reject = (pred, array) => array.filter((...args) => !pred(...args));
EXAMPLES
reject(x => x % 2 === 0, [1, 2, 3, 4, 5]); // [1, 3, 5]
reject(word => word.length > 4, ['Apple', 'Pear', 'Kiwi', 'Banana']); // ['Pear', 'Kiwi']
remove
Removes elements from an array for which the given function returns false.

Use Array.prototype.filter() to find array elements that return truthy values and Array.prototype.reduce() to remove elements using Array.prototype.splice(). The func is invoked with three arguments (value, index, array).


const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];
EXAMPLES
remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]
sample
Returns a random element from an array.

Use Math.random() to generate a random number, multiply it by length and round it off to the nearest whole number using Math.floor(). This method also works with strings.


const sample = arr => arr[Math.floor(Math.random() * arr.length)];
EXAMPLES
sample([3, 7, 9, 11]); // 9
sampleSize
Gets n random elements at unique keys from array up to the size of array.

Shuffle the array using the Fisher-Yates algorithm. Use Array.prototype.slice() to get the first n elements. Omit the second argument, n to get only one element at random from the array.


const sampleSize = ([...arr], n = 1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};
EXAMPLES
sampleSize([1, 2, 3], 2); // [3,1]
sampleSize([1, 2, 3], 4); // [2,3,1]
shank
Has the same functionality as Array.prototype.splice(), but returning a new array instead of mutating the original array.

Use Array.prototype.slice() and Array.prototype.concat() to get a new array with the new contents after removing existing elements and/or adding new elements. Omit the second argument, index, to start at 0. Omit the third argument, delCount, to remove 0 elements. Omit the fourth argument, elements, in order to not add any new elements.


const shank = (arr, index = 0, delCount = 0, ...elements) =>
  arr
    .slice(0, index)
    .concat(elements)
    .concat(arr.slice(index + delCount));
EXAMPLES
const names = ['alpha', 'bravo', 'charlie'];
const namesAndDelta = shank(names, 1, 0, 'delta'); // [ 'alpha', 'delta', 'bravo', 'charlie' ]
const namesNoBravo = shank(names, 1, 1); // [ 'alpha', 'charlie' ]
console.log(names); // ['alpha', 'bravo', 'charlie']
shuffle
Randomizes the order of the values of an array, returning a new array.

Uses the Fisher-Yates algorithm to reorder the elements of the array.


const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
EXAMPLES
const foo = [1, 2, 3];
shuffle(foo); // [2, 3, 1], foo = [1, 2, 3]
similarity
Returns an array of elements that appear in both arrays.

Use Array.prototype.filter() to remove values that are not part of values, determined using Array.prototype.includes().


const similarity = (arr, values) => arr.filter(v => values.includes(v));
EXAMPLES
similarity([1, 2, 3], [1, 2, 4]); // [1, 2]
sortedIndex
Returns the lowest index at which value should be inserted into array in order to maintain its sort order.

Check if the array is sorted in descending order (loosely). Use Array.prototype.findIndex() to find the appropriate index where the element should be inserted.


const sortedIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.findIndex(el => (isDescending ? n >= el : n <= el));
  return index === -1 ? arr.length : index;
};
EXAMPLES
sortedIndex([5, 3, 2, 1], 4); // 1
sortedIndex([30, 50], 40); // 1
sortedIndexBy
Returns the lowest index at which value should be inserted into array in order to maintain its sort order, based on a provided iterator function.

Check if the array is sorted in descending order (loosely). Use Array.prototype.findIndex() to find the appropriate index where the element should be inserted, based on the iterator function fn.


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el => (isDescending ? val >= fn(el) : val <= fn(el)));
  return index === -1 ? arr.length : index;
};
EXAMPLES
sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0
sortedLastIndex
Returns the highest index at which value should be inserted into array in order to maintain its sort order.

Check if the array is sorted in descending order (loosely). Use Array.prototype.reverse() and Array.prototype.findIndex() to find the appropriate last index where the element should be inserted.


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.reverse().findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};
EXAMPLES
sortedLastIndex([10, 20, 30, 30, 40], 30); // 4
sortedLastIndexBy
Returns the highest index at which value should be inserted into array in order to maintain its sort order, based on a provided iterator function.

Check if the array is sorted in descending order (loosely). Use Array.prototype.map() to apply the iterator function to all elements of the array. Use Array.prototype.reverse() and Array.prototype.findIndex() to find the appropriate last index where the element should be inserted, based on the provided iterator function.


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};
EXAMPLES
sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1
stableSort
Performs stable sorting of an array, preserving the initial indexes of items when their values are the same. Does not mutate the original array, but returns a new array instead.

Use Array.prototype.map() to pair each element of the input array with its corresponding index. Use Array.prototype.sort() and a compare function to sort the list, preserving their initial order if the items compared are equal. Use Array.prototype.map() to convert back to the initial array items.


const stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);
EXAMPLES
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const stable = stableSort(arr, () => 0); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
symmetricDifference
Returns the symmetric difference between two arrays, without filtering out duplicate values.

Create a Set from each array, then use Array.prototype.filter() on each of them to only keep values not contained in the other.


const symmetricDifference = (a, b) => {
  const sA = new Set(a),
    sB = new Set(b);
  return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
};
EXAMPLES
symmetricDifference([1, 2, 3], [1, 2, 4]); // [3, 4]
symmetricDifference([1, 2, 2], [1, 3, 1]); // [2, 2, 3]
symmetricDifferenceBy
Returns the symmetric difference between two arrays, after applying the provided function to each array element of both.

Create a Set by applying fn to each array's elements, then use Array.prototype.filter() on each of them to only keep values not contained in the other.


const symmetricDifferenceBy = (a, b, fn) => {
  const sA = new Set(a.map(v => fn(v))),
    sB = new Set(b.map(v => fn(v)));
  return [...a.filter(x => !sB.has(fn(x))), ...b.filter(x => !sA.has(fn(x)))];
};
EXAMPLES
symmetricDifferenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [ 1.2, 3.4 ]
symmetricDifferenceWith
Returns the symmetric difference between two arrays, using a provided function as a comparator.

Use Array.prototype.filter() and Array.prototype.findIndex() to find the appropriate values.


const symmetricDifferenceWith = (arr, val, comp) => [
  ...arr.filter(a => val.findIndex(b => comp(a, b)) === -1),
  ...val.filter(a => arr.findIndex(b => comp(a, b)) === -1)
];
EXAMPLES
symmetricDifferenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
); // [1, 1.2, 3.9]
tail
Returns all elements in an array except for the first one.

Return Array.prototype.slice(1) if the array's length is more than 1, otherwise, return the whole array.


const tail = arr => (arr.length > 1 ? arr.slice(1) : arr);
EXAMPLES
tail([1, 2, 3]); // [2,3]
tail([1]); // [1]
take
Returns an array with n elements removed from the beginning.

Use Array.prototype.slice() to create a slice of the array with n elements taken from the beginning.


const take = (arr, n = 1) => arr.slice(0, n);
EXAMPLES
take([1, 2, 3], 5); // [1, 2, 3]
take([1, 2, 3], 0); // []
takeRight
Returns an array with n elements removed from the end.

Use Array.prototype.slice() to create a slice of the array with n elements taken from the end.


const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length);
EXAMPLES
takeRight([1, 2, 3], 2); // [ 2, 3 ]
takeRight([1, 2, 3]); // [3]
takeRightWhile
Removes elements from the end of an array until the passed function returns true. Returns the removed elements.

Loop through the array, using a Array.prototype.reduceRight() and accumulating elements while the function returns falsy value.


const takeRightWhile = (arr, func) =>
  arr.reduceRight((acc, el) => (func(el) ? acc : [el, ...acc]), []);
EXAMPLES
takeRightWhile([1, 2, 3, 4], n => n < 3); // [3, 4]
takeWhile
Removes elements in an array until the passed function returns true. Returns the removed elements.

Loop through the array, using a for...of loop over Array.prototype.entries() until the returned value from the function is true. Return the removed elements, using Array.prototype.slice().


const takeWhile = (arr, func) => {
  for (const [i, val] of arr.entries()) if (func(val)) return arr.slice(0, i);
  return arr;
};
EXAMPLES
takeWhile([1, 2, 3, 4], n => n >= 3); // [1, 2]
toHash
Reduces a given Array-like into a value hash (keyed data store).

Given an Iterable or Array-like structure, call Array.prototype.reduce.call() on the provided object to step over it and return an Object, keyed by the reference value.


const toHash = (object, key) =>
  Array.prototype.reduce.call(
    object,
    (acc, data, index) => ((acc[!key ? index : data[key]] = data), acc),
    {}
  );
EXAMPLES
toHash([4, 3, 2, 1]); // { 0: 4, 1: 3, 2: 2, 3: 1 }
toHash([{ a: 'label' }], 'a'); // { label: { a: 'label' } }
// A more in depth example:
let users = [{ id: 1, first: 'Jon' }, { id: 2, first: 'Joe' }, { id: 3, first: 'Moe' }];
let managers = [{ manager: 1, employees: [2, 3] }];
// We use function here because we want a bindable reference, but a closure referencing the hash would work, too.
managers.forEach(
  manager =>
    (manager.employees = manager.employees.map(function(id) {
      return this[id];
    }, toHash(users, 'id')))
);
managers; // [ { manager:1, employees: [ { id: 2, first: "Joe" }, { id: 3, first: "Moe" } ] } ]
union
Returns every element that exists in any of the two arrays once.

Create a Set with all values of a and b and convert to an array.


const union = (a, b) => Array.from(new Set([...a, ...b]));
EXAMPLES
union([1, 2, 3], [4, 3, 2]); // [1,2,3,4]
unionBy
Returns every element that exists in any of the two arrays once, after applying the provided function to each array element of both.

Create a Set by applying all fn to all values of a. Create a Set from a and all elements in b whose value, after applying fn does not match a value in the previously created set. Return the last set converted to an array.


const unionBy = (a, b, fn) => {
  const s = new Set(a.map(fn));
  return Array.from(new Set([...a, ...b.filter(x => !s.has(fn(x)))]));
};
EXAMPLES
unionBy([2.1], [1.2, 2.3], Math.floor); // [2.1, 1.2]
unionWith
Returns every element that exists in any of the two arrays once, using a provided comparator function.

Create a Set with all values of a and values in b for which the comparator finds no matches in a, using Array.prototype.findIndex().


const unionWith = (a, b, comp) =>
  Array.from(new Set([...a, ...b.filter(x => a.findIndex(y => comp(x, y)) === -1)]));
EXAMPLES
unionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)); // [1, 1.2, 1.5, 3, 0, 3.9]
uniqueElements
Returns all unique values of an array.

Use ES6 Set and the ...rest operator to discard all duplicated values.


const uniqueElements = arr => [...new Set(arr)];
EXAMPLES
uniqueElements([1, 2, 2, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]
uniqueElementsBy
Returns all unique values of an array, based on a provided comparator function.

Use Array.prototype.reduce() and Array.prototype.some() for an array containing only the first unique occurence of each value, based on the comparator function, fn. The comparator function takes two arguments: the values of the two elements being compared.


const uniqueElementsBy = (arr, fn) =>
  arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []);
EXAMPLES
uniqueElementsBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'a' }, { id: 1, value: 'b' }, { id: 2, value: 'c' } ]
uniqueElementsByRight
Returns all unique values of an array, based on a provided comparator function.

Use Array.prototype.reduce() and Array.prototype.some() for an array containing only the last unique occurence of each value, based on the comparator function, fn. The comparator function takes two arguments: the values of the two elements being compared.


const uniqueElementsByRight = (arr, fn) =>
  arr.reduceRight((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []);
EXAMPLES
uniqueElementsByRight(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'e' }, { id: 1, value: 'd' }, { id: 2, value: 'c' } ]
uniqueSymmetricDifference
Returns the unique symmetric difference between two arrays, not containing duplicate values from either array.

Use Array.prototype.filter() and Array.prototype.includes() on each array to remove values contained in the other, then create a Set from the results, removing duplicate values.


const uniqueSymmetricDifference = (a, b) => [
  ...new Set([...a.filter(v => !b.includes(v)), ...b.filter(v => !a.includes(v))])
];
EXAMPLES
uniqueSymmetricDifference([1, 2, 3], [1, 2, 4]); // [3, 4]
uniqueSymmetricDifference([1, 2, 2], [1, 3, 1]); // [2, 3]
unzip
Creates an array of arrays, ungrouping the elements in an array produced by zip.

Use Math.max.apply() to get the longest subarray in the array, Array.prototype.map() to make each element an array. Use Array.prototype.reduce() and Array.prototype.forEach() to map grouped values to individual arrays.


const unzip = arr =>
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length))
    }).map(x => [])
  );
EXAMPLES
unzip([['a', 1, true], ['b', 2, false]]); // [['a', 'b'], [1, 2], [true, false]]
unzip([['a', 1, true], ['b', 2]]); // [['a', 'b'], [1, 2], [true]]
unzipWith
Creates an array of elements, ungrouping the elements in an array produced by zip and applying the provided function.

Use Math.max.apply() to get the longest subarray in the array, Array.prototype.map() to make each element an array. Use Array.prototype.reduce() and Array.prototype.forEach() to map grouped values to individual arrays. Use Array.prototype.map() and the spread operator (...) to apply fn to each individual group of elements.


const unzipWith = (arr, fn) =>
  arr
    .reduce(
      (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
      Array.from({
        length: Math.max(...arr.map(x => x.length))
      }).map(x => [])
    )
    .map(val => fn(...val));
EXAMPLES
unzipWith([[1, 10, 100], [2, 20, 200]], (...args) => args.reduce((acc, v) => acc + v, 0)); // [3, 30, 300]
without
Filters out the elements of an array, that have one of the specified values.

Use Array.prototype.filter() to create an array excluding(using !Array.includes()) all given values.

(For a snippet that mutates the original array see pull)


const without = (arr, ...args) => arr.filter(v => !args.includes(v));
EXAMPLES
without([2, 1, 2, 3], 1, 2); // [3]
xProd
Creates a new array out of the two supplied by creating each possible pair from the arrays.

Use Array.prototype.reduce(), Array.prototype.map() and Array.prototype.concat() to produce every possible pair from the elements of the two arrays and save them in an array.


const xProd = (a, b) => a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);
EXAMPLES
xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
zip
Creates an array of elements, grouped based on the position in the original arrays.

Use Math.max.apply() to get the longest array in the arguments. Creates an array with that length as return value and use Array.from() with a map-function to create an array of grouped elements. If lengths of the argument-arrays vary, undefined is used where no value could be found.


const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map(x => x.length));
  return Array.from({ length: maxLength }).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
  });
};
EXAMPLES
zip(['a', 'b'], [1, 2], [true, false]); // [['a', 1, true], ['b', 2, false]]
zip(['a'], [1, 2], [true, false]); // [['a', 1, true], [undefined, 2, false]]
zipObject
Given an array of valid property identifiers and an array of values, return an object associating the properties to the values.

Since an object can have undefined values but not undefined property pointers, the array of properties is used to decide the structure of the resulting object using Array.prototype.reduce().


const zipObject = (props, values) =>
  props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {});
EXAMPLES
zipObject(['a', 'b', 'c'], [1, 2]); // {a: 1, b: 2, c: undefined}
zipObject(['a', 'b'], [1, 2, 3]); // {a: 1, b: 2}
zipWith
Creates an array of elements, grouped based on the position in the original arrays and using function as the last value to specify how grouped values should be combined.

Check if the last argument provided is a function. Use Math.max() to get the longest array in the arguments. Creates an array with that length as return value and use Array.from() with a map-function to create an array of grouped elements. If lengths of the argument-arrays vary, undefined is used where no value could be found. The function is invoked with the elements of each group (...group).


const zipWith = (...array) => {
  const fn = typeof array[array.length - 1] === 'function' ? array.pop() : undefined;
  return Array.from(
    { length: Math.max(...array.map(a => a.length)) },
    (_, i) => (fn ? fn(...array.map(a => a[i])) : array.map(a => a[i]))
  );
};
EXAMPLES
