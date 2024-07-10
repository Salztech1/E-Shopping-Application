import CategoryItem from '../category-item/category-item.component';
import './directory.styles.scss'

const Directory = ({categoriesA}) => {
    return (
        <div className="directory-container">

            {categoriesA.map((category) => (
                <CategoryItem key={category.id} categoryA={category} />
            ))}

        </div>
    )
}

export default Directory