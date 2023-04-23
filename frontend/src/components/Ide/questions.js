import MathJax from "react-mathjax";

export const questions = [
  {
    component: (
      <div class="coding-question">
        <p class=" ">
          Consider an algorithm that takes as input a positive integer n . If n
          is even, the algorithm divides it by two, and if n is odd, the
          algorithm multiplies it by three and adds one. <br />
          <span class="flex">
            The algorithm repeats this, until n is one. For example, the
            sequence for &nbsp; <MathJax.Node formula={"n = 3"} />
            &nbsp; is as follows
          </span>
        </p>
        <p className="flex justify-center my-2">
          <MathJax.Node
            formula={
              "3\\rightarrow10\\rightarrow5\\rightarrow16\\rightarrow8\\rightarrow4\\rightarrow2\\rightarrow1"
            }
          />
        </p>
        <br />
        <p>
          Your task is to simulate the execution of the algorithm for a given
          value of n.
        </p>
        <p class="font-semibold underline">Input </p>

        <p>The only input line contains an integer n.</p>
        <br />
        <p class="font-semibold underline">Output</p>

        <p>Print a line that contains all values of n during the algorithm.</p>
        <br />

        <p class="font-semibold underline">Constraints</p>

        <div class="flex flex-col justify-start">
          <MathJax.Node formula={"1 \\leq n \\leq 10^6"} />
        </div>
        <br />
        <p class="font-semibold">Example</p>

        <p class="">Input: </p>
        <code>
          {" "}
          3
          <br />
        </code>
        <br />
        <p class="">Output: </p>
        <code> 3 10 5 16 8 4 2 1 </code>
      </div>
    ),
    timeLimit: "1 sec",
    memoryLimit: "512MB",
    title: "Weird Algorithm",
  },
  {
    component: (
      <div class="coding-question">
        <p class=" ">
          You are given all numbers between 1,2,…,n except one. Your task is to
          find the missing number. <br />
        </p>
        <br />
        <p class="font-semibold underline">Input </p>

        <p>The first input line contains an integer n.</p>
        <p>
          The second line contains n−1 numbers. Each number is distinct and
          between 1 and n (inclusive).
        </p>
        <br />
        <p class="font-semibold underline">Output</p>

        <p>Print the missing number.</p>
        <br />

        <p class="font-semibold underline">Constraints</p>

        <div class="flex flex-col justify-start">
          <MathJax.Node formula={"2 \\leq n \\leq 2\\cdot10^5"} />
        </div>
        <br />
        <p class="font-semibold">Example</p>

        <p class="">Input: </p>
        <code>
          5 <br />
          2 3 1 5
          <br />
        </code>
        <br />
        <p class="">Output: </p>
        <code> 4</code>
      </div>
    ),
    timeLimit: "1 sec",
    memoryLimit: "512MB",
    title: "Missing Number",
  },
  {
    component: (
      <div class="coding-question">
        <p class="">
          You are given a DNA sequence: a string consisting of characters A, C,
          G, and T.
          <br />
          Your task is to find the longest repetition in the sequence. This is a
          maximum-length substring containing only one type of character.
        </p>
        <br />
        <p class="font-semibold underline">Input </p>
        <p>The only input line contains a string of n characters.</p>
        <br />
        <p class="font-semibold underline">Output</p>
        <p>Print one integer: the length of the longest repetition.</p>
        <br />
        <p class="font-semibold underline">Constraints</p>
        <div class="flex flex-col justify-start">
          <MathJax.Node formula={"1 \\leq n \\leq 10^6"} />
        </div>
        <br />
        <p class="font-semibold">Example</p>
        <br />
        <p class="">Input: </p>
        <code>ATTCGGGA</code>
        <br /> <br />
        <p class="">Output: </p>
        <code> 3 </code>
      </div>
    ),
    timeLimit: "1 sec",
    memoryLimit: "512MB",
    title: "Repetitions",
  },
  {
    component: (
      <div class="coding-question">
        <p class="">
          You are given an array of n integers. You want to modify the array so
          that it is increasing, i.e., every element is at least as large as the
          previous element.
          <br />
          On each move, you may increase the value of any element by one. What
          is the minimum number of moves required?
        </p>
        <br />
        <p class="font-semibold underline">Input </p>

        <p>
          The first input line contains an integer n : the size of the array.
          <br />
          <span class="flex items-center">
            Then, the second line contains n integers &nbsp;{" "}
            <MathJax.Node formula={"x_1,x_2,...,x_n"} /> &nbsp; : the contents
            of the array.
          </span>
        </p>
        <br />
        <p class="font-semibold underline">Output</p>

        <p>Print the minimum number of moves.</p>
        <br />

        <p class="font-semibold underline">Constraints</p>

        <div class="flex flex-col justify-start">
          <MathJax.Node formula={"1 \\leq n \\leq 2\\cdot10^5"} />
          <MathJax.Node formula={"1 \\leq x_i \\leq 10^9"} />
        </div>

        <br />
        <br />
        <p class="font-semibold">Example</p>

        <p class="">Input: </p>
        <code>
          {" "}
          5 <br /> 3 2 5 1 7{" "}
        </code>
        <br />
        <p class="">Output: </p>
        <code> 5 </code>
      </div>
    ),
    timeLimit: "1 sec",
    memoryLimit: "512MB",
    title: "Increasing Array",
  },
  {
    component: (
      <div class="coding-question">
        <p class="">
          A permutation of integers 1,2,…,n is called beautiful if there are no
          adjacent elements whose difference is 1 .
          <br />
          Given n, construct a beautiful permutation if such a permutation
          exists.
        </p>
        <br />
        <p class="font-semibold underline">Input </p>
        <p>The first input line contains an integer n</p>
        <br />
        <p class="font-semibold underline">Output</p>
        <p>
          Print a beautiful permutation of integers 1,2,…,n . If there are
          several solutions, you may print any of them. If there are no
          solutions, print "NO SOLUTION".
        </p>
        <br />
        <p class="font-semibold underline">Constraints</p>
        <div class="flex flex-col justify-start">
          <MathJax.Node formula={"1 \\leq n \\leq 10^6"} />
        </div>
        <br />
        <p class="font-semibold">Example 1</p>
        <br />
        <p class="">Input: </p>
        <code>5</code>
        <br /> <br />
        <p class="">Output: </p>
        <code> 4 2 5 3 1 </code>
        <br /> <br />
        <p class="font-semibold">Example 2</p>
        <br />
        <p class="">Input: </p>
        <code>3</code>
        <br /> <br />
        <p class="">Output: </p>
        <code> NO SOLUTION </code>
      </div>
    ),
    timeLimit: "1 sec",
    memoryLimit: "512MB",
    title: "Permutations",
  },
  {
    component: (
      <div class="coding-question">
        <p class="">
          A number spiral is an infinite grid whose upper-left square has number
          1. Here are the first five layers of the spiral:
        </p>
        <div className="flex justify-center">
          <img src={process.env.PUBLIC_URL + "/assets/img/spira.png"} />
        </div>
        <p class="">
          Your task is to find out the number in row{" "}
          <MathJax.Node formula="y" style={{ display: "inline-block" }} /> and
          column{" "}
          <MathJax.Node formula="x" style={{ display: "inline-block" }} /> .
        </p>
        <br />
        <p class="font-semibold underline">Input </p>
        <p>The first input line contains an integer t : the number of tests.</p>
        <p>After this, there are t lines, each containing integers y and x .</p>
        <br />
        <p class="font-semibold underline">Output</p>
        <p>After this, there are t lines, each containing integers y and x .</p>
        <br />
        <p class="font-semibold underline">Constraints</p>
        <div class="flex flex-col justify-start">
          <MathJax.Node formula={"1 \\leq t \\leq 10^5"} />
          <MathJax.Node formula={"1 \\leq y,x \\leq 10^9"} />
        </div>
        <br />
        <p class="font-semibold">Example </p>
        <br />
        <p class="">Input: </p>
        <code>
          3 <br />
          2 3 <br />
          1 1 <br />4 2
        </code>
        <br /> <br />
        <p class="">Output: </p>
        <code>
          8 <br />
          1 <br />
          15{" "}
        </code>
        <br /> <br />
      </div>
    ),
    timeLimit: "1 sec",
    memoryLimit: "512MB",
    title: "Number Spiral",
  },
  {
    component: (
      <div class="coding-question">
        <p class="">
          Your task is to count for{" "}
          <MathJax.Node
            formula="k=1,2,…,n"
            style={{ display: "inline-block" }}
          />{" "}
          the number of ways two knights can be placed on a{" "}
          <MathJax.Node
            formula="k \times k"
            style={{ display: "inline-block" }}
          />{" "}
          chessboard so that they do not attack each other.
        </p>
        <br />
        <p class="font-semibold underline">Input </p>
        <p>
          The only input line contains an integer{" "}
          <MathJax.Node formula="n" style={{ display: "inline-block" }} />.
        </p>
        <br />
        <p class="font-semibold underline">Output</p>
        <p>
          Print{" "}
          <MathJax.Node formula="n" style={{ display: "inline-block" }} />{" "}
          integers: the results.
        </p>
        <br />
        <p class="font-semibold underline">Constraints</p>
        <div class="flex flex-col justify-start">
          <MathJax.Node formula={"1 \\leq n \\leq 10^4"} />
        </div>
        <br />
        <p class="font-semibold">Example </p>
        <br />
        <p class="">Input: </p>
        <code>8</code>
        <br /> <br />
        <p class="">Output: </p>
        <code>
          0 <br />
          6 <br />
          28 <br />
          96 <br />
          252 <br />
          550 <br />
          1056 <br />
          1848
        </code>
        <br /> <br />
      </div>
    ),
    timeLimit: "1 sec",
    memoryLimit: "512MB",
    title: "Two Knights",
  },
];
export const topicsWithQuestions = [
  {
    topicName : "Introductory Problems",
    questions : [
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repetitions"},
      {indexInArray : 3,questionName: "Increasing Array"},
      {indexInArray : 4,questionName: "Permutations"},
      {indexInArray : 5,questionName: "Number Spiral"},
      {indexInArray : 6,questionName: "Two Knights"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
    ]
  },
  {
    topicName : "Sorting And Searching",
    questions : [
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
    ]
  },
  {
    topicName : "Dynamic Programming",
    questions : [
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
    ]
  },
  {
    topicName : "Graph Algorithms",
    questions : [
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
    ]
  },
  {
    topicName : "Range Queries",
    questions : [
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
    ]
  },
  {
    topicName : "Tree algorithms",
    questions : [
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
    ]
  },
  {
    topicName : "Mathematics",
    questions : [
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
    ]
  },
  {
    topicName : "Strings",
    questions : [
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
    ]
  },
  {
    topicName : "Geometry",
    questions : [
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
    ]
  },
  {
    topicName : "Advanced Techniques",
    questions : [
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
      {indexInArray : 0,questionName: "Weird Algorithm"},
      {indexInArray : 1,questionName: "Missing Number"},
      {indexInArray : 2,questionName: "Repititions"},
    ]
  },
]