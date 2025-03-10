from fastapi import APIRouter

router = APIRouter()


@router.get('/')
async def get_data():
    groupData = [
        {
            "img": "",
            "title": "Sales",
            "count": "22",
            "highlight": True,
        },
        {
            "img": "",
            "title": "Sales",
            "count": "22",
        },
        {
            "img": "",
            "title": "Sales",
            "count": "22",
        },
    ]

    taskData = [
        {
            "title": "Finish the UI and ask Animesh .. ",
            "url": "http://example.com",
        },
        {
            "title": "Fix bugs 🔥",
            "url": "http://example.com",
            "highlight": True,
        },
        {
            "title": "Test the dev release to make .. 🧊",
            "url": "http://example.com",
        },
    ]

    escalationData = [
        {
            "title": "Channel the playground is ..",
            "sub_heading": "Alpha Conclave",
            "user_name": "Sagar SK",
            "highlight": True,
        },
        {
            "title": "There is an issue with this ..",
            "sub_heading": "Beta Den",
            "user_name": "Alex",
        },
    ]
    
    temp_data = {
        "groupData": groupData,
        "taskData": taskData,
        "escalationData": escalationData
    }

    return temp_data
