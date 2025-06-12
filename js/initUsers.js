// Certifica-te que os modelos estão carregados antes deste ficheiro:
// studentModel.js e teachersModel.js

// Criar estudantes
const student1 = new Student(
    1,
    "Ana Estudante",
    "ana@student.com",
    "1234",
    "9º ano",
    "EE Ana",
    "nenhuma",
    "feminino",
    "2009-05-12",
    "Lisboa",
    ["matemática", "português"],
    "Adoro aprender com patos!",
    10,
    1
);

students.push(student1);

// Criar explicadores
const teacher1 = new Teacher(
    1,
    "Carlos Mestre",
    "carlos@teacher.com",
    "abcd",
    "nenhuma",
    "masculino",
    "1985-02-20",
    "Porto",
    ["Licenciatura em Matemática"],
    ["matemática"],
    "Ensinar é a minha paixão.",
    "presencial",
    "individual",
    "15€/h",
    50,
    2
);

teachers.push(teacher1);

// Criar admin (podes usar um modelo de teacher para simplificar, mas com priority 3)
const admin1 = new Teacher(
    2,
    "Admin Geral",
    "admin@teachme.com",
    "adminpass",
    "nenhuma",
    "outro",
    "1990-01-01",
    "Coimbra",
    ["Gestão Educacional"],
    ["todas"],
    "Sou o admin da plataforma.",
    "online",
    "grupo",
    "0€/h",
    999,
    3
);

teachers.push(admin1);
