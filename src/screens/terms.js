import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
} from 'react-native'
import { gStyle } from '../constants';

import NavigationBack from '../components/NavigationBack';

export default class Terms extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <NavigationBack navigation={navigation} />,
    headerRight: <View style={{ flex: 1 }} />,
    headerTitleStyle: gStyle.headerTitleStyle,
    title:  'شروط واحكام'
  });
  render() {
    return (
      <View style={{flex: 1}}>
      <ScrollView>
        <Text style={{color:"#000",marginHorizontal: 10}}>{`
          *هذه الاتفاقية تقدم معلومات مهمة بالنسبة لك تضم معلومات حول مسؤوليتك عن المحتوى الخاص بك، تحديد مسؤليتنا تجاهك وموافقتك على تسوية أي خلافات عن طريق التحكيم الفردي، والتنازل كذلك عن حق المشاركة في أي دعوة صنف ضد سوق الرمثا او  أو أي من الشركات التابعة لها. وبالدخول إلى منصة سوق الرمثا فإنك توافق على الشروط التالية:  
                   الحساب الخاص بك: يتطلب الحصول على بعض الخدمات الموجودة في سوق الرمثا منك إنشاء حساب خاص بك من خلال بريدك الإلكتروني وكلمة سر تقوم بوضعها، وسيكون هذا البريد الإلكتروني هو البريد المعتمد فيما ستكون أنت المسؤول عن سرية كلمة السر الخاصة بحسابك، إضافة إلى ذلك ستكون أنت المسؤول عن كافة النشاطات الصادرة منه. ومن أجل ذلك لا بد من حماية كلمة السر الخاصة واختيار كلمة يصعب الوصول إليها من قبل الآخرين. وبدورنا فإننا ننصح جميع المستخدمين بوضع الاسم الأول والأخير الخاص بهم في خانة "اسم المستخدم" ويمنع استخدام أسماء مثل: سوق الرمثا أو Ramtha souq أو Ramthasouq وما إلى ذلك.       كما


           يمكنك أيضاً تسجيل الدخول و إنشاء حساب على الموقع من خلال خدمات أطراف أخرى "الطرف الثالث" مثل (الفيسبوك) والتي تأذن لنا الوصول إلى معلوماتك الخاصة وتخزينها واستخدامها تبعاً لكونها خدمة مسموح الوصول إليها كما هو موضّح في سياسة الخصوصية لدينا. وفي حال تعرّض حسابك الخاص للإختراق أو تم استخدامه بشكل خاطئ، الرجاء الاتصال على فريق خدمة العملاء لدينا على الفور.        استخدام سوق الرمثا: يمكن النشر على أي من الأقسام لدينا مع تجنّب الأمور التالية:     ·         انتهاك أي من القوانين أو أي نقطة من سياسة المحتوى المحظور لدينا   ·         نشر إعلانات خاطئة أو مضللة   ·         انتهاك أي من حقوق أي طرف اخر   ·         نشر أي بريد مؤذي أو رسائل تسلسلية أو مخطط تسويق هرمي   ·         نشر الفيروسات أو أي تكنولوجيا أخرى من شأنها أن تضر بالموقع أو مصالح وممتلكات المستخدمين أو أي شخص   ·         أي عمل تخريبي كعمليات محاولات حجب الخدمة أو فرض عبء غير منطقي على بنية التحتية للموقع   ·         نسخ أو تعديل أو نشر محتوى لشخص آخر   ·         استخدام أي وسيلة محظورة للوصول إلى قاعدة بيانات الموقع وجمع المحتوى لأي غرض , و منها البوت و عناكب الشبكة و الطرق المماثلة لذلك   ·         جمع معلومات عن مستخدمين آخرين بما في ذلك البريد الإلكتروني الخاص أو أي معلومات شخصية اخرى   ·         تجاوز الإجراءات المستخدمة لمنع أو تقييد الدخول إلى الموقع   ·         استخدام معلومات شخصية خاصة بأشخاص اخرين دون موافقة صريحة منهم       المحتوى المحظور: سيتم حذف أي إعلان يحتوي على واحد أو أكثر من الأمور المحظورة أدناه، بمجرد التعرف على المحظور ويحتفظ الموقع بحق الحذف النهائي لحساب المستخدم، أو وضعه على القائمة السوداء أو إبلاغ السلطات المختصة لتطبيق القانون اللازم:       ·         المشروبات الكحولية والخمور ومنتجات التبغ والمخدرات والمؤثرات العقلية والمسكرات والأدوية والمسكنات، أو حتى وضع روابط سواء كانت مباشرة أم غير مباشرة لمواد ومنتجات أو خدمات يحظر القانون تداولها (للمكملات الغذائية ومنتجات التنحيف والكريمات التجميلية يجب أن يتم تزويدنا بصورة عن موافقة من مؤسسة الغذاء والدواء)   ·         الأعضاء البشرية الطبيعية أو الصناعية بما في ذلك الدم وسوائل الجسم أيضاً.   ·         الدعارة أو أي خدمات أخرى من ضمنها، تنتهك أحكام القانون بشكل غير أخلاقي أو التمثيل غير اللائق بالمرأة والذي من شأنه أن ينتهك المعايير المعاصرة للأخلاق والآداب في المجتمعات العربية.   ·         المواد الدينية بما في ذلك الكتب والتحف... إلخ أو أي معلومات أو وصف لأي من هذه المواد يمس المشاعر الدينية لأي شخص أو مجموعة.   ·         الأدوات والإيحاءات الجنسية (وتضم: إيحاءات العبودية والأصنام) أو تصوير الأعضاء التناسلية وما إلى ذلك.   ·         الآثار أو الكنوز الممنوع تداولها تحت أي قانون معمول به.   ·         معلومات ومواد تشير إلى القذف أو التشهير أو التهديد أو حتى الإساءة   ·         معلومات مزورة لطبيعة أو طريقة استخدام المنتجات والخدمات   ·         السلع المزيفة أو المسروقة أو الخدمات غير القانونية والمصرّح بها   ·         السلع والمواد والخدمات التي تنتهك حقوق وملكية فكرية خاصة بأي طرف ثالث، أو حتى خصوصية أي شخص   ·         نقل فيروسات الكمبيوتر الإلكترونية أو أي برنامج من شأنه أن يقوم بقرصنة أنظمة الكمبيوتر وإتلافها وسحب البيانات الشخصية   ·         يجب ألا تضم المعلومات الخاصة بك أي محتوى فيه إهانة للمستخدمين و/أو الحيوانات   ·         المواد الكيميائية والمبيدات الخطرة   ·         الألعاب النارية والمتفجرات والعبوات الناسفة وما إلى ذلك من مواد مشتعلة وخطيرة   ·         الوثائق الشخصية والسجلات المالية وأي معلومات شخصية بما في ذلك القوائم البريدية   ·         تذاكر اليانصيب ومراهنات سباق الخيل وماكينات القمار   ·         المعدات الخاصة بالشرطة والجيش من شارات وزي رسمي ومعاطف وأسلحة وما إلى ذلك من مواد يمنع تداولها   ·         نشر إعلانات لمواقع او شركات منافسة سوق الرمثا   ·         الأسلحة والأدوات ذات الصلة (مثل: الأسلحة النارية والذخائر والغاز المسيل للدموع والنادق والأدوات الحادة)   ·         خدمات ومخططات التسويق الهرمي للاحتيال على المستخدمين   ·         نشر إعلانات العاب فيديو مصنفة +18 مثل (GTA , God of War....الخ)   ·         المشاريع الوهمية (مثل: الثراء السريع والعمل من المنزل)   ·         اختيار الأقسام والأقسام الفرعية الخاطئة (مثل: الإعلان عن طاولة طعام في قسم أثاث المكاتب)   ·         الحيوانات المهددة بالإنقراض أو الحيوانات الشرسة   ·         إعلانات القروض والتمويل وشركات التسهيلات التجارية   ·         السيارات الغير مخصصة للإيجار (السيارات الخصوصية)  ·        يسمح بنشر إعلانات "عاملات للتنازل" في الموقع فقط للمكاتب أو الشركات المرخصة ·        الوشم (التاتو) ومستلزماته ·        إضافة إعلانات تحتوي على "نقل الكفالة"   ·        إعلانات الدرون واكسسواراتها        *سوء استخدام سوق الرمثا: الرجاء استخدام نظام التنبيه لإبلاغنا عن أية مشاكل أو محتوى غير لائق للعمل معاً على الحفاظ على المسار الصحيح للخدمات التي يقدمها الموقع. وبدورنا سنقوم بإنهاء خدماتنا اتجاه من يسيؤون استخدام الموقع وإزالة المحتوى الخاص بهم واتخاذ الإجراءات القانونية للحفاظ على حقوق المستخدمين الآخرين. وفي حال تمّ إتخاذ أي من هذه الإجراءات فإن الموقع غير مسؤول عن طبيعة أي محتوى غير لائق تم نشره وما يترتب عليه فيما بعد، ولذلك باستخدام سوق الرمثا ، فأنت توافق كمستخدم على أن تكون مسؤولاً عن المحتوى الذي تدرجه على سوق الرمثا بشكل مباشر.        يتم حظر الممارسات التالية عند النشر على سوق الرمثا:       ·         إنشاء أكثر من حساب   ·         نشر الإعلانات المكررة   ·         حذف الإعلانات وإعادة نشرها بشكل متكرر   ·         نشر الإعلانات ذات العناوين والمحتوى والصور المضلّلة   ·         نشر إعلانات مع صور خاطئة أو غير لائقة   ·         نشر الإعلانات في أقسام خاطئة   ·         نشر إعلانات مع أسعار غير منطقية   ·         نشر الإعلانات مع روابط إعادة توجيه إلى مواقع أخرى   ·         تحميل صور تحتوي على أسماء وأرقام هواتف و أي كلمات أخرى   ·         نشر إعلانات تحتوي على خيار الدفع المسبق أو تحويل للبنوك   ·         نشر إعلانات ذات محتوى عام أو محتوى دعائي عام   ·         نشر إعلانات تحتوي على عدة سلع   ·         نشر سلع يمكن ارتداؤها دون تحميل صور لها   ·         نشر إعلانات احتيال وإعلانات وهمية   ·         تحميل صور تحتوي على نفس نص الإعلان أو على صور لشعارات شركات أخرى داخل الصور للاعلان   ·         نشر إعلانات تحتوي على كلمة “خادمة/خادمات/خدم” واستبدالها ب “عاملة أو عاملات“   ·         لا يسمح بتعديل الإعلان المميز لبيع سلعة/منتج أو خدمة أخرى ويمكن تعديل الإعلان المميز ٣ مرات فقط     المحتوى: يحتوي سوق الرمثا على أمور يقدمها الموقع نفسه والمستخدمين أيضاً، وكمستخدم للموقع فأنت توافق على عدم نسخ أو تعديل أو نشر حقوق الملكية والعلامة التجارية الخاصة بنا. وعند نشر أي محتوى خاص بك لدينا فإنك تمنحنا أحقية دائمة لا تُلغى بتطبيق حقوق وسياسة المحتوى والنشر المتبعة في الموقع، وفي حال شعرت بأنه يتم انتهاك حقوقك الخاصة الرجاء إبلاغ قسم خدمة العملاء لدينا وسوق نقوم بالتحقق من الأمر، ولا يزال لدينا الحق بإزالة أي محتوى فيه انتهاك لأي من شروط الاستخدام لدينا أو حقوق الطرف الآخر.     نصائح التعامل الامن: يمكنك البيع والشراء عبر سوق الرمثا من خلال إيجاد السلعة التي ترغب بشرائها أولاً ، ثم التواصل مع المعلن من خلال طرق التواصل المتوفرة والاستفسار عن ما ترغب به ، والاتفاق على عملية البيع والتسليم, ليكون البيع آمن دون وجود احتيال نرجوا منك التأكد من وجود سلعة حقيقية ، معاينتها ، عدم إرسال أية مبالغ نقدية لأي جهة دون التأكد من المعلن والسلعة ، ويفضل التواصل مع المعلن ومقابلته على أرض الواقع، وتفادي عمليات الدفع المسبق والشحن التي تتم, يمكنك إتباع النصائح والخطوات التالية عند البيع والشراء في موقع سوق الرمثا:   1.اختيار البائع بحكمة. 2. لا تقم بتسليم أي مبالغ مالية قبل الحصول على الخدمة المقدمة من قبل البائع. 3. اطلب صور المنتج الفعلي. 4. معرفة حالة المنتج. (اطلب منهم جميع الاستفسارات الرئيسية والثانوية الخاصة بالإعلان مثل (حالة المنتج و سبب بيعها وتفاصيل المنتج). 5. تأكد من سعر المنتج بحيث أن يكون بحدود المعقول (إذا كان لديك أي فكرة عن كيفية تسعير المنتج يمكنك إجراء بحث سريع لأخذ فكرة عن السعر). 6. استخدام طرق دفع آمنة.   يمكنك تذكر المعلومات التالية قبل لقاء البائع أو المشتري:   - معاينة المنتج قبل الشراء والتأكد من سلامته وعدم  وجود أي خلل فيه. - لا تقم بتسليم أي مبالغ مالية قبل الحصول على الخدمة المقدمة من قبل البائع. - التأكيد على مكان اللقاء لتسليم أو استلام المنتج. - الإستفسار بشكل كامل عن المنتج من البائع قبل الشراء.   ملاحظة: سوق الرمثا غير مسؤول عن عمليات البيع والشراء التي تتم بين المعلنين ، حيث أننا مجرد وسيط بين البائع والمشتري لعرض الإعلانات المبوبة المجانية.   يمكنك معرفة الأشخاص المحتالين، من خلال الشك بأي محاولات بيع غير آمنة أو من قبل أشخاص محتالين في حال: - كانت اعلانات السلعة المعروضة تتضمن صور معروضة من الانترنت ( غير حقيقية ). - في حال كان السعر قليل جداً ( مقارنة بأسعار السوق المحلي ). - عندما تسأل عن صور إضافية عن المنتج فإنها لا تتوفر لدى البائع. - عند الاستفسار عن تفاصيل حول اي بند من الإعلان، يعطي الكثير من الإجابات غير متناسقة. - عند طلب اللقاء منهم لمعاينة المنتج أو تسليمه، فإنهم يقدمون أعذارا كثيرة جدا.- يتم الإصرار على تحويل أموالك ... بسرعة!   يمكنك التبليغ عن المحتالين من خلال التواصل معنا فوراً، في حال شككت بمصداقية إعلان أحد المستخدمين على سوق الرمثا. بالإضافة إلى ذلك، نحثّك على التوجه إلى الشرطة إن وقعت في فخ الاحتيال. نحن مستعدون لتزويد الشرطة بأي معلومات تخدم التحقيق، بناءً على طلب رسمي منهم. سارع إلى تعبئة طلب لنتمكن من إيقاف حساب الشخص بعد القيام بالتحرّيات اللازمة. الإبلاغ عن انتهاكات حقوق الملكية الفكرية: يحظر على المستخدمين نشر أي محتوى فيه انتهاك لحقوق الملكية الخاصة بالأطراف الثالثة؛ وهذا يشمل وليس على سبيل الحصر؛ انتهاك حقوق الملكية الفكرية والعلامات التجارية (مثل: الإعلان عن مواد وهمية للبيع). ولدينا الحق في إزالة أي محتوى مخالف لشروط سياسة النشر لدينا وحماية حقوق الآخرين. وفي حال شعرت بأن أحد الإعلانات لدينا تنتهك حقوق الملكية والعلامة التجارية الخاصة بك، كل ما عليك فعله حينها هو إبلاغ قسم خدمة العملاء لدينا، وصاحب هذه الحقوق هو فقط من يستطيع أن يقدم بلاغ ضد الشروط والإعلانات التي من المحتمل أنها تمسه.     الرسوم والخدمات: بشكل عام إن الإعلان على سوق الرمثا مجاني، إلا أننا نفرض رسوماً على بعض الخدمات التي نوفرها للمستخدمين. وفي حال قمت باستخدام إحدى الخدمات التي نفرض عليها رسوماً سيكون مطلوباً منك استعراضها والموافقة عليها، ويتم الدفع إما بالعملة المحلية أو بالدولار الأمريكي، وقد نقوم بتغيير هذه الآلية من وقت لآخر، وبدورنا نقوم بإبلاغك بأي تغيير على سياسة الدفع عن طريق نشرها على الموقع، وقد نختار بعض التغييرات في طريقة الدفع بشكل مؤقت عند نشر الإعلانات الترويجية أو الخدمات الجديدة. من جهة أخرى إن هذه الرسوم غير قابلة للاسترداد وعليك دفعها، وإن لم تقم بذلك سنقوم بإلغاء صلاحية الخدمة التي استخدمتها.       الإعلان عن وكالات: هذا المصطلح يعود إلى الطرف الثالث وهو الوكيل أو الخدمة أو نشر محتوى خدماتي نيابة عن الآخرين، وسياسة سوق الرمثا تحظر مثل هذا الإعلان سواء كان بشكل مباشر أو غير مباشر دون الحصول على تصريح مكتوب من سوق الرمثا. إضافة إلى ذلك، يُحظر نشر إعلانات نيابة عن الأطراف المعنية إلا بوجود تصريح كتابي أو رخصة من الموقع نفسه.       التنازلات وحدود المسؤولية: يتم تقديم خدمات سوق الرمثا كما هي موجودة أو كما هي متاحة، وكمستخدم فأنت توافق على عدم تحميل الموقع مسؤولية عن أي محتوى ينشره المستخدمون الآخرون بما في ذلك على سبيل المثال لا الحصر: الإعلانات أو الرسائل المباشرة بين المستخدمين. كما أن الموقع لا يضمن دقة الإعلانات أو وسائل الإتصال الموجودة أو مدى الآمان أو حتى الإلتزام بالقوانين فيها، لأن معظم ما يتم نشره على الموقع يكون من قبل المستخدمين، إضافة إلى عدم ضمان الوصول المستمر إلى الخدمات، ولا يوجد نظام تنبيه أول بأول حول الخدمات وهذا خارج عن سيطرتنا؛ بما في ذلك التأجيل أو التأخر بسبب موقعك الجغرافي أو وضع شبكة الإنترنت. ووفقاً للحد القانوني المسموح به، فإننا نخلي مسؤوليتنا من أي ضمانات وبيانات وشروط صريحة أو ضمنية تتضمن الجودة، الرواج، طبيعة التداول التجاري، المتانة ومدى ملائمتها للغرض التي صنعت من أجله. كما أننا لا نتحمل مسؤولية أي خسارة سواء بالمال (بما في ذلك الربح) أو السمعة الجيدة أو أي أضرار خاصة أو غير مباشرة ناتجة عن استخدامك للموقع، حتى لو تمّ إعلامنا بذلك أو كنا نتوقع حصول مثل هذا الشيء. كما أن بعض السلطات القضائية لا تسمح بالتنازل عن الضمانات أو استبعاد حصول أضرار، لذا فإن مثل هذه التنازلات والاستثناءات قد لا تنطبق عليك.       *وبالرغم من هذا كله، إذا وجدنا أنفسنا مسؤولين تجاهك او تجاه أي طرف ثالث (سواء في العقد المبرم أو أي طرق أخرى)، فإن مسؤوليتنا محدودة وتقتصر على الأكثر بين (أ) مجموع ما تم دفعه من خلالك لخدماتنا المدفوعة لصالح حسابك على الموقع مباشرة خلال فترة 3 أشهر التي تسبق الفعل المسبب للمسؤولية، أو (ب) 20 دولار أمريكي.       التعويض: ستكون مطالب بتقديم تعويض لأي طرف ثالث يقوم بتقديم شكوى ضدك بما في ذلك أي مبالغ مستحقة الدفع له سواء عند التسوية أو عمّا قد تمّ منحه مسبقاً، إضافة إلى التكاليف القانونية التي تكبدها أي من الأطراف المؤمنة، والتي نتجت عن استخدامك للسوق الرمثا وانتهاك أحد شروط الاستخدام والقوانين المعمول بها، ولن يكون الموقع ولا المدراء ولا الموظفين و لا المسؤلين العاملين في الموقع مسؤول عن أي من هذه التعويضات، و يحتفظ الموقع بحق االدفاع والتحكّم عن أي مسألة قانونية، وهذا لا يعني إعفاءك من الإلتزام بدفع هذه التعويضات.       المعلومات الشخصية: عند استخدامك للسوق الرمثا فأنت توافق على جمع ونقل وتخزين واستخدام المعلومات الشخصية الخاصة بك على مختلف المواقع الأخرى من قبل الموقع.   
                 شروط الاستخدام عبر الهواتف المحمولة: إذا كنت تستخدم سوق الرمثا من خلال تطبيقنا على الهواتف المحمولة، فإن إتفاقية شروط الاستخدام هذه و سياسة الخصوصية المنشورة على الموقع تنطبق عليك، بالإضافة إلى سياسة الخصوصية المتعلقة بالهاتف المحمول والإشعار القانوني وإتفاقية الرخصة من العميل. وإن استخدامك للتطبيق يؤكد موافقتك على شروط الاستخدام هذه.       استخدام التطبيق: يمنحك سوق الرمثا حق الاستخدام الشخصي للتطبيق الخاص به، لذا يجب عليك الامتثال لجميع القوانين المعمول بها واتفاقية شروط الطرف الثالث (مثل: اتفاقية خدمة الشبكة اللاسلكية). وقد لا يحتوي التطبيق على جميع الوظائف والخدمات التي يوفرها موقع سوق الرمثا، وبإمكانك تحميل واستخدام تطبيق سوق الرمثا بحيث تكون أنت المسؤول عن أي أضرار قد تصيب جهازك أو فقدان للبيانات ناتج عن تحميله واستخدامه.      




        `}</Text>
            </ScrollView>
      </View>
    )
  }
}
