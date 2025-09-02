const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourse_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: '"Generate a comprehensive JSON-formatted course outline based on the following requirements. Include key details such as the Course Name, Description, Chapter breakdown (with Chapter Name, Description, and Duration for each chapter), and an overall course summary.\n\nCategory: Programming\nTopic: Rust\nLevel: Beginner\nDuration: 1 hour\nNo of Chapters: 5',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course_name": "Rust for Beginners",\n  "description": "This course provides a beginner-friendly introduction to the Rust programming language. Learn the fundamentals of Rust syntax, data types, control flow, functions, and more. By the end of this course, you\'ll be able to write basic Rust programs and understand the core concepts of this powerful language.",\n  "chapters": [\n    {\n      "chapter_name": "Introduction to Rust",\n      "description": "This chapter introduces the Rust programming language, its history, key features, and why it\'s gaining popularity.",\n      "duration": "10 minutes"\n    },\n    {\n      "chapter_name": "Setting Up Your Rust Environment",\n      "description": "Learn how to install Rust and its tools, including the Rust compiler, Cargo, and your preferred IDE.",\n      "duration": "10 minutes"\n    },\n    {\n      "chapter_name": "Rust Basics: Syntax and Data Types",\n      "description": "Explore fundamental Rust syntax, including variables, constants, data types (integers, floats, booleans, strings), and basic operations.",\n      "duration": "20 minutes"\n    },\n    {\n      "chapter_name": "Control Flow and Functions",\n      "description": "Learn about conditional statements (if-else), loops (for, while), and how to define and use functions in Rust.",\n      "duration": "20 minutes"\n    },\n    {\n      "chapter_name": "Introduction to Ownership and Borrowing",\n      "description": "This chapter introduces Rust\'s unique ownership and borrowing system, which ensures memory safety and prevents data corruption.",\n      "duration": "10 minutes"\n    }\n  ],\n  "summary": "This course will equip you with the foundational knowledge needed to start your journey with Rust. You\'ll learn the basics of the language, including its syntax, data types, control flow, and the crucial concept of ownership. By the end, you\'ll be comfortable writing simple Rust programs and ready to explore more advanced topics."\n}\n``` \n',
        },
      ],
    },
  ],
});

export const GenerateChapter_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in Detail on Topic: Advanced Rust Programming, Chapter:Ownership and Borrowing in Depth, in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example(Code field in <precode> format) if applicable\n\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "title": "Ownership and Borrowing Fundamentals",\n    "explanation": "This section delves deeper into Rust\'s ownership and borrowing rules, building on the basic concepts. It emphasizes how ownership transfers between variables and how borrowing allows access to data without taking ownership.",\n    "code": "<precode>\\nlet s = String::from(\\"hello\\"); // \'s\' takes ownership of the string\\nlet s1 = s; // ownership is transferred to \'s1\', \'s\' becomes invalid\\n\\n// Borrowing\\nlet s = String::from(\\"hello\\");\\nlet len = s.len(); // Borrowing \'s\' to calculate length\\nprintln!(\\"The length of \'{}\' is {}.", s, len);\\n</precode>"\n  },\n  {\n    "title": "Mutable References and Ownership",\n    "explanation": "This section discusses how mutable references allow modification of borrowed data. It emphasizes the strict rules for using mutable references: only one mutable reference can exist at a time, and it cannot coexist with immutable references.",\n    "code": "<precode>\\nlet mut s = String::from(\\"hello\\");\\nlet r1 = &mut s; // Mutable borrow of \'s\'\\n*r1 = String::from(\\"world\\"); // Modifying \'s\' through the mutable reference\\n\\n// Error: Cannot have multiple mutable references at the same time\\n//let r2 = &mut s; \\n</precode>"\n  },\n  {\n    "title": "Dangling References and Ownership",\n    "explanation": "This section explains the concept of dangling references – references that point to invalid memory locations. It emphasizes how Rust\'s ownership system prevents dangling references by ensuring that the data referenced remains valid for the lifetime of the reference.",\n    "code": "<precode>\\n// Example of dangling reference (not allowed in Rust)\\nlet r; // Reference declared but not initialized\\n{ // Create a local scope\\n    let s = String::from(\\"hello\\");\\n    r = &s; // \'r\' references \'s\', which will be dropped at the end of the scope\\n} // \'s\' is dropped here, making \'r\' a dangling reference\\n// Error: Cannot access \'s\' after the scope ends\\nprintln!(\\"The value is: {}\\", *r);\\n</precode>"\n  },\n  {\n    "title": "References and Functions",\n    "explanation": "This section explores how references are used with functions. It illustrates how functions can borrow data without taking ownership, ensuring that data is not copied unnecessarily. It also covers the different types of function parameters: mutable and immutable references.",\n    "code": "<precode>\\nfn calculate_length(s: &str) -> usize { // Immutable reference\\n    s.len()\\n}\\n\\nfn change_string(s: &mut String) { // Mutable reference\\n    s.push_str(\\" world\\");\\n}\\n\\nlet mut s = String::from(\\"hello\\");\\nlet len = calculate_length(&s); // Immutable borrow\\nprintln!(\\"The length of \'{}\' is {}.", s, len);\\nchange_string(&mut s); // Mutable borrow\\nprintln!(\\"The string is now: {}", s);\\n</precode>"\n  },\n  {\n    "title": "The `&` and `&mut` Operators",\n    "explanation": "This section clarifies the use of the `&` and `&mut` operators in creating references. It emphasizes how `&` creates an immutable reference, while `&mut` creates a mutable reference.",\n    "code": "<precode>\\nlet s = String::from(\\"hello\\");\\nlet r1 = &s; // Immutable reference\\nlet r2 = &mut s; // Mutable reference\\n</precode>"\n  },\n  {\n    "title": "Borrowing and Data Structures",\n    "explanation": "This section demonstrates how borrowing works with various data structures, like vectors and structs. It highlights how references can be used to access and modify elements of these structures without taking ownership.",\n    "code": "<precode>\\n// Using references with vectors\\nlet mut v = vec![1, 2, 3];\\nlet first = &v[0]; // Borrow the first element\\nprintln!(\\"The first element is: {}", first);\\n\\n// Using references with structs\\nstruct Person { name: String, age: u32 }\\nlet mut person = Person { name: String::from(\\"Alice\\"), age: 30 };\\nlet name_ref = &person.name; // Borrow the name field\\nprintln!(\\"The person\'s name is: {}", name_ref);\\n</precode>"\n  },\n  {\n    "title": "Lifetime Annotations",\n    "explanation": "This section introduces lifetime annotations, a feature that allows the compiler to verify the validity of references. It explains how these annotations help ensure that references remain valid throughout their lifetimes, preventing dangling references.",\n    "code": "<precode>\\nfn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str { // Lifetime annotations\\n    if x.len() > y.len() { x } else { y }\\n}\\n</precode>"\n  },\n  {\n    "title": "Lifetime Elision",\n    "explanation": "This section explores lifetime elision, a set of rules that the compiler uses to infer lifetimes automatically in many cases. It explains the three elision rules and how they simplify lifetime management.",\n    "code": "<precode>\\n// Example of lifetime elision\\nfn longest(x: &str, y: &str) -> &str { // No lifetime annotations needed\\n    if x.len() > y.len() { x } else { y }\\n}\\n</precode>"\n  },\n  {\n    "title": "Static Lifetime",\n    "explanation": "This section introduces the static lifetime, which represents the entire duration of the program. It explains how static references can be used to access data that lives for the whole program execution.",\n    "code": "<precode>\\nstatic HELLO: &str = \\"hello\\"; // Static reference\\nprintln!(\\"Static string: {}", HELLO);\\n</precode>"\n  }\n]\n```',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
