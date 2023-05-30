import Club from "./cardSymbols/Club";
import Heart from "./cardSymbols/Heart";
import Diamond from "./cardSymbols/Diamond";
import Spade from "./cardSymbols/Spade";

export default function PrizeList() {
  return (
    <section className="prizeList">
      <div className="prize">
        <p>Royal flush 100x :</p>
        <div></div>
        <div className="eachPrize">
          <p>10</p>
          <Spade />
        </div>
        <div className="eachPrize">
          <p>J</p>
          <Spade />
        </div>
        <div className="eachPrize">
          <p>Q</p>
          <Spade />
        </div>
        <div className="eachPrize">
          <p>K</p>
          <Spade />
        </div>
        <div className="eachPrize">
          <p>A</p>
          <Spade />
        </div>
      </div>
      <div className="prize">
        <p>Straight flush 50x :</p>
        <div></div>
        <div className="eachPrize">
          <p>4</p>
          <Diamond />
        </div>
        <div className="eachPrize">
          <p>5</p>
          <Diamond />
        </div>
        <div className="eachPrize">
          <p>6</p>
          <Diamond />
        </div>
        <div className="eachPrize">
          <p>7</p>
          <Diamond />
        </div>
        <div className="eachPrize">
          <p>8</p>
          <Diamond />
        </div>
      </div>
      <div className="prize">
        <p>Four of a kind 20x : </p>
        <div></div>
        <div className="eachPrize">
          <p>9</p>
          <Club />
        </div>
        <div className="eachPrize">
          <p>9</p>
          <Diamond />
        </div>
        <div className="eachPrize">
          <p>9</p>
          <Heart />
        </div>
        <div className="eachPrize">
          <p>9</p>
          <Spade />
        </div>
        <div className="eachPrize">
          <p>5</p>
          <Diamond />
        </div>
      </div>
      <div className="prize">
        <p>Full house 7x :</p>
        <div></div>
        <div className="eachPrize">
          <p>6</p>
          <Club />
        </div>
        <div className="eachPrize">
          <p>6</p>
          <Heart />
        </div>
        <div className="eachPrize">
          <p>Q</p>
          <Club />
        </div>
        <div className="eachPrize">
          <p>Q</p>
          <Heart />
        </div>
        <div className="eachPrize">
          <p>Q</p>
          <Spade />
        </div>
      </div>
      <div className="prize">
        <p>Flush 5x :</p>
        <div></div>
        <div className="eachPrize">
          <p>2</p>
          <Heart />
        </div>
        <div className="eachPrize">
          <p>3</p>
          <Heart />
        </div>
        <div className="eachPrize">
          <p>8</p>
          <Heart />
        </div>
        <div className="eachPrize">
          <p>J</p>
          <Heart />
        </div>
        <div className="eachPrize">
          <p>K</p>
          <Heart />
        </div>
      </div>
      <div className="prize">
        <p>Straight 4x :</p>
        <div></div>
        <div className="eachPrize">
          <p>8</p>
          <Club />
        </div>
        <div className="eachPrize">
          <p>9</p>
          <Diamond />
        </div>
        <div className="eachPrize">
          <p>10</p>
          <Heart />
        </div>
        <div className="eachPrize">
          <p>J</p>
          <Club />
        </div>
        <div className="eachPrize">
          <p>Q</p>
          <Heart />
        </div>
      </div>
      <div className="prize">
        <p>Three of a kind 3x :</p>
        <div></div>
        <div className="eachPrize">
          <p>7</p>
          <Heart />
        </div>
        <div className="eachPrize">
          <p>7</p>
          <Diamond />
        </div>
        <div className="eachPrize">
          <p>7</p>
          <Spade />
        </div>
        <div className="eachPrize">
          <p>J</p>
          <Club />
        </div>
        <div className="eachPrize">
          <p>A</p>
          <Club />
        </div>
      </div>
      <div className="prize">
        <p>Two pair 2x :</p>
        <div></div>
        <div className="eachPrize">
          <p>9</p>
          <Diamond />
        </div>
        <div className="eachPrize">
          <p>9</p>
          <Heart />
        </div>
        <div className="eachPrize">
          <p>K</p>
          <Club />
        </div>
        <div className="eachPrize">
          <p>K</p>
          <Diamond />
        </div>
        <div className="eachPrize">
          <p>2</p>
          <Club />
        </div>
      </div>
    </section>
  );
}
