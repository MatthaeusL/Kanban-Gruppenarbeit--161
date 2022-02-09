let kanbanArray = [{
    'tasks': [{
            'taskid': 0,
            'title': 'Code some',
            'category': 'Development',
            'description': 'A Task for Inav: Code 10000 Rows',
            'duedate': '2022-02-24',
            'urgency': 'urgency',
            'status': 'todo',
            'urgencyColor': '--bgVeryImportant',
            'categoryColor': '--bgDevelopment',
            'assignedTo': ['Inav Bolski']
        },
        {
            'taskid': 1,
            'title': 'Check Data',
            'category': 'Management',
            'description': 'A task for Klaus. Check Business Data for next trades.',
            'duedate': '2022-02-24',
            'urgency': 'urgency',
            'status': 'inprogress',
            'urgencyColor': ' --bgNotSoImportant',
            'categoryColor': '--bgManagment',
            'assignedTo': ['Klaus Meier']

        },
        {
            'taskid': 2,
            'title': 'Party',
            'category': 'Inhouse',
            'description': 'A task for Laura: Organise a massive carnival Party',
            'duedate': '2022-02-24',
            'urgency': 'urgency',
            'status': 'backlog',
            'urgencyColor': '--bgVeryImportant',
            'categoryColor': '--bgInhouse',
            'assignedTo': ['Laura Trautmann']
        },
        {
            'taskid': 3,
            'title': 'Aquise',
            'category': 'Sales',
            'description': 'A Task for Tom: Get more clients by end of the day',
            'duedate': '2022-02-24',
            'urgency': 'urgency',
            'status': 'backlog',
            'urgencyColor': '--bgIMportant: yellow',
            'categoryColor': '--bgSale',
            'assignedTo': ['Tom Müller']
        },
        {
            'taskid': 4,
            'title': 'Hire people',
            'category': 'Human ressources',
            'description': 'A task for Karin: Hire some rocket scientists',
            'duedate': '2022-02-25',
            'urgency': 'urgency',
            'status': 'backlog',
            'urgencyColor': ' --bgNotSoImportant',
            'categoryColor': '--bgHumanRessources',
            'assignedTo': ['Karin Schneider']
        }
    ],
    'users': [{
            'userid': 0,
            'username': 'Klaus Meier',
            'email': 'Klaus_Meier@web.de',
            'key': 'key',
            'img': 'face1.jpg',
            'category': 'Marketing',
            'color': '--bgMarketing',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        },
        {
            'userid': 1,
            'username': 'Inav Bolski',
            'email': 'InavBolski@Yahoo.de',
            'key': 'key',
            'img': 'face3.jpg',
            'category': 'Sale',
            'color': '--bgSale',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        },
        {
            'userid': 2,
            'username': 'Laura Trautmann',
            'email': 'Laura-Trautmann@t-online.de',
            'key': 'key',
            'img': 'face5.jpg',
            'category': 'Design',
            'color': '--bgDesign',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        },
        {
            'userid': 3,
            'username': 'Tom Müller',
            'email': 'MüllerTom@GMX.de',
            'key': 'key',
            'img': 'face2.jpg',
            'category': 'Sale',
            'color': '--bgSale',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        },
        {
            'userid': 4,
            'username': 'Karin Schneider',
            'email': 'Schneider@web.de',
            'key': 'key',
            'img': 'face4.jpg',
            'category': 'Service',
            'color': '--bgService',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        }
    ]
}]


assignedUser = [];


let users = {
    'userid_1': 'userid_12',
    'username': 'username',
    'email': 'email',
    'key': 'key',
    'img': 'img',
    'category': 'category',
    'color': 'color',
};
