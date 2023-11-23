import {useRouter,usePathname} from '../../../navigation';
import { useLocale } from 'next-intl';
import { NavigateOptions } from 'react-router-dom';

const LanguageDropdown = () => {
    // const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (x:any) => {
        router.push(pathname,{locale:x})
    }

    return (
        <div className='pb-4 md:pb-0 pl-3 pr-4'>
            <select className='bg-[#2D3681] py-1 text-base px-3 rounded' onChange={(e)=>handleLanguageChange(e.target.value)} value={locale}>
                <option value="en">English</option>
                <option value="ms">Malay</option>
            </select>
        </div>
    )
}

export default LanguageDropdown;