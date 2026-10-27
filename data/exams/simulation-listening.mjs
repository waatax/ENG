// Three original three-question conversations and one three-question talk.
const sources=[
['conversation','Woman: The conference registration closes on Friday, but I cannot find the approval form. Man: It is on the staff portal under professional development. Woman: Does my supervisor need to sign it? Man: Yes. Send the signed form to me by Thursday afternoon so I can submit the payment before the deadline.',[
['What is the woman trying to find?','An approval form','A hotel receipt','A conference room','A train schedule'],
['Where is the document available?','On the staff portal','At the station','Inside the conference hall','In a printed catalog'],
['Why must the form be sent by Thursday?','To allow time for payment before registration closes','To reserve a hotel for the supervisor','To change the conference topic','To request a later deadline']]],
['conversation','Man: The restaurant called. They can prepare lunch for our visitors, but they cannot deliver until one. Woman: Our workshop begins at one, so that is too late. Could someone collect the food at noon? Man: I can drive there. Please ask them to pack vegetarian meals separately. Woman: I will call them now.',[
['What problem are the speakers discussing?','Lunch would arrive too late','The workshop has no visitors','The restaurant has closed','A vehicle needs repairs'],
['What does the man offer to do?','Collect the food','Lead the workshop','Cook every meal','Cancel the booking'],
['What will the woman request?','Separate packaging for vegetarian meals','A different workshop room','A refund for all meals','Delivery at two o’clock']]],
['conversation','Woman: I noticed the customer survey is still asking about the old product line. Man: You are right. The marketing team sent a revised version this morning. Woman: Have any customers completed the old one today? Man: Only three. We will keep those responses separately and publish the new link after lunch.',[
['What is wrong with the survey?','It refers to an old product line','It has no response button','It asks for a credit card','It was translated incorrectly'],
['Who sent the revised version?','The marketing team','Three customers','A delivery driver','An external accountant'],
['How will the earlier responses be handled?','They will be stored separately','They will be sent to all customers','They will replace the revised survey','They will be published as advertisements']]],
['talk','Attention all tenants. The water supply will be turned off this Saturday from nine in the morning until noon while maintenance workers replace a valve. Please store any water you will need before nine. The ground-floor washrooms will also be closed during this period. If the work finishes early, an announcement will be posted in the entrance hall. For urgent questions, contact the building manager, not the maintenance contractor.',[
['Who is the announcement intended for?','Building tenants','Train passengers','Museum guides','Restaurant customers'],
['Why will the water be unavailable?','A valve is being replaced','A storm damaged the roof','The building is closing permanently','The water bill was not paid'],
['Whom should people contact with urgent questions?','The building manager','The maintenance contractor','The station attendant','The city librarian']]]
];
export const listening=sources.flatMap(([skill,audio,rows],g)=>rows.map(([prompt,...options],i)=>({id:`sim-listening-${g}-${i}`,group:`sim-listening-${g}`,skill,audio,prompt,options,answer:0,type:'listen',why:'根據音訊中的明確資訊：'+options[0]+'。其他選項與敘述不符。'})));
